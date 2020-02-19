package com.iStore.iStore.service;

import java.io.ByteArrayOutputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.Iterator;
import java.util.List;
import java.util.Optional;

import javax.validation.ValidationException;

import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.Font;
import org.apache.poi.ss.usermodel.IndexedColors;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.ss.util.CellRangeAddress;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.iStore.iStore.constants.ISTOREConstants;
import com.iStore.iStore.model.GenericResponse;
import com.iStore.iStore.model.Item;
import com.iStore.iStore.model.Product;
import com.iStore.iStore.model.Stock;
import com.iStore.iStore.repository.ProductRepository;
import com.iStore.iStore.repository.StockRepository;

@Service
public class ProductServiceImpl implements ProductService {
	@Autowired
	ProductRepository repository;
	@Autowired
	StockRepository stockRepository;

	@Autowired
	CategoryService categoryService;
	Stock stock = new Stock();

	private static String[] columns = { "Category", "Inventory", "Minimum Availabity" };

	@Override
	public Product createOrUpdate(Product entity) {
		try {
			return repository.save(entity);
		} catch (Exception e) {
			throw new ValidationException(e.getMessage());
		}
	}

	@Override
	public GenericResponse delete(Integer id) {
		GenericResponse resp = null;
		try {
			Product p = get(id);
			p.setActiveFlag(1);
			createOrUpdate(p);
			resp = new GenericResponse();
			resp.setMessage(id + " " + ISTOREConstants.DELETED);
		} catch (Exception e) {
			throw new ValidationException(e.getMessage());
		}
		return resp;
	}

	@Override
	public List<Product> getAll() {
		return (List<Product>) repository.findByActiveFlagAllIgnoreCaseOrderByProductOrderAsc(0);
	}

	@Override
	public Product get(Integer id) {
		Optional<Product> product = null;
		try {
			product = repository.findByIdAndActiveFlag(id, 0);
		} catch (Exception e) {
			throw new ValidationException(e.getMessage());
		}

		if (product.isPresent())
			return product.get();
		else
			throw new ValidationException("Record not found with the id " + id);
	}

	@Override
	public void deleteInventory(List<Item> items) {
		items.forEach(i -> {
			Optional<Product> product = null;
			try {
				product = repository.findByIdAndActiveFlag(i.getProduct().getId(), 0);
				int inventory = product.get().getInventory() - i.getQuantity();
				if (inventory > -1) {
					product.get().setInventory(inventory);
					repository.save(product.get());
				} else {
					throw new ValidationException("Record not found with the product id " + i.getProduct().getId());
				}

			} catch (Exception e) {
				throw new ValidationException(e.getMessage());
			}
		});
	}

	@Override
	public void addInventory(List<Item> items) {
		items.forEach(i -> {
			Optional<Product> product = null;
			try {
				product = repository.findByIdAndActiveFlag(i.getProduct().getId(), 0);
				int inventory = product.get().getInventory() + i.getQuantity();
				if (inventory > -1) {
					product.get().setInventory(inventory);
					repository.save(product.get());
				} else {
					throw new ValidationException("Record not found with the product id " + i.getProduct().getId());
				}
			} catch (Exception e) {
				throw new ValidationException(e.getMessage());
			}
		});
	}

	@Override
	public GenericResponse setinventory(List<Product> products) {
		Stock stck = stockRepository.save(stock);
		GenericResponse gr = new GenericResponse();
		try {
			for (Iterator<Product> pro = products.iterator(); pro.hasNext();) {
				Product product = (Product) pro.next();
				repository.updateInventoryById(product.getId(), product.getInventory());
				product.setStockId(stck.getId());
			}
		} catch (Exception e) {
			throw new ValidationException(e.getMessage());
		}
		gr.setMessage("Successfully updated Inventory");
		return gr;
	}

	@Override
	public byte[] downloadInventory() throws IOException {
		List<Product> products = repository.downloadInventory();
		return generateExcel(products);
	}

	int rowNumber = 1;

	private byte[] generateExcel(List<Product> products) throws IOException {

		// Create a Workbook
		Workbook workbook = new XSSFWorkbook();
		// Create a Sheet
		Sheet sheet = workbook.createSheet("Inventory");
		int previousRowId = -1;
		// Create a Font for styling header cells
		Font headerFont = workbook.createFont();
		headerFont.setBold(true);
		headerFont.setFontHeightInPoints((short) 14);
		headerFont.setColor(IndexedColors.RED.getIndex());

		// Create a CellStyle with the font
		CellStyle headerCellStyle = workbook.createCellStyle();
		headerCellStyle.setFont(headerFont);

		// Create a Row
		Row headerRow = sheet.createRow(0);
		// Create cells
		for (int i = 0; i < columns.length; i++) {
			Cell cell = headerRow.createCell(i);
			cell.setCellValue(columns[i]);
			cell.setCellStyle(headerCellStyle);
		}
		for (int p = 0; p < products.size(); p++) {
			if (previousRowId < 0) {
				Row row = sheet.createRow(rowNumber);
				row.createCell(0).setCellValue(products.get(p).getCategory().getName());
				mergeRow(sheet, rowNumber); // Merge rows here
				// Set Header Style
				generateRow(sheet, products, p);
			} else {
				if (previousRowId > 0 && previousRowId != products.get(p).getCategory().getId()) {
					Row row = sheet.createRow(rowNumber);
					row.createCell(0).setCellValue(products.get(p).getCategory().getName());
					mergeRow(sheet, rowNumber); // Merge rows here
					generateRow(sheet, products, p);
				} else {
					Row subrow = sheet.createRow(rowNumber);
					subrow.createCell(0).setCellValue(products.get(p).getName());
					subrow.createCell(1).setCellValue(products.get(p).getInventory());
					subrow.createCell(2).setCellValue(products.get(p).getMinimumAvailability());
					rowNumber++;
				}
			}
			try {
				previousRowId = products.get(p).getCategory().getId();
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
		// Resize all columns to fit the content size
		for (int i = 0; i < columns.length; i++) {
			sheet.autoSizeColumn(i);
		}

		ByteArrayOutputStream os = new ByteArrayOutputStream();
		workbook.write(os);
		byte[] bytes = os.toByteArray();
		return bytes;
		// Write the output to a file
		// FileOutputStream fileOut = new FileOutputStream("inventory-file.xlsx");

		// workbook.write(fileOut);
		// fileOut.close();

		// Closing the workbook
		// workbook.close();

	}

	private void generateRow(Sheet sheet, List<Product> products, int p) {
		Row subrow = sheet.createRow(++rowNumber);
		subrow.createCell(0).setCellValue(products.get(p).getName());
		subrow.createCell(1).setCellValue(products.get(p).getInventory());
		subrow.createCell(2).setCellValue(products.get(p).getMinimumAvailability());
		rowNumber++;
	}

	private void mergeRow(Sheet sheet, int rowIndex) {
		sheet.addMergedRegion(new CellRangeAddress(rowIndex, // first row (0-based)
				rowIndex, // last row (0-based)
				0, // first column (0-based)
				2 // last column (0-based)
		));
	}
}
