package com.istore.service;

import java.util.List;
import java.util.Optional;

import javax.validation.ValidationException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.istore.constants.ISTOREConstants;
import com.istore.model.GenericResponse;
import com.istore.model.Item;
import com.istore.model.Product;
import com.istore.repository.ProductRepository;

import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class ProductServiceImpl implements ProductService {
	@Autowired
	ProductRepository repository;

	@Autowired
	CategoryService categoryService;

	// int rowNumber = 1;
	// private static String[] columns = { "Category", "Inventory", "Minimum
	// Availabity", "Current Stock" };

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
		GenericResponse resp;
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
		return repository.findByActiveFlagAllIgnoreCaseOrderByNameAsc(0);
	}

	@Override
	public Product get(Integer id) {
		Optional<Product> product;
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
	public void addInventory(List<Item> items) {
		items.forEach(i -> {
			try {
				repository.addInventoryById(i.getProduct().getId(), i.getQuantity());
			} catch (Exception e) {
				throw new ValidationException(e.getMessage());
			}
		});
	}

	// @Override
	// public GenericResponse setinventory(List<Product> products) {
	// GenericResponse gr = new GenericResponse();
	// try {
	// for (Product product : products) {
	// // TODO
	// // repository.addInventoryById(product.getId(),
	// // product.getInventory());
	// }
	// } catch (Exception e) {
	// throw new ValidationException(e.getMessage());
	// }
	// gr.setMessage("Successfully updated Inventory");
	// return gr;
	// }

	// @Override
	// public Map<String, List<Product>> getCurrentInventory() {
	// Set<String> uniqueCategories = new HashSet<>();
	//
	// List<Product> products = repository.downloadInventory(); // Get all
	// // records
	// // of
	// // products
	// List<Product> newProducts;
	// Map<String, List<Product>> inventory = new HashMap<>();
	// // Assign currentstock and get unique Categories
	// for (Product product : products) {
	// uniqueCategories.add(product.getCategory().getName()); // unique
	// // Catgories
	// // If availability less than inventory calculate inventory minus
	// // availability
	// // else return zero
	// // TODO
	// // product.setCurrentStock(product.getInventory() <
	// // product.getMinimumAvailability()
	// // ? product.getMinimumAvailability() - product.getInventory()
	// // : 0);
	// }
	// // Map category with its products
	// for (String uniqueCategory : uniqueCategories) {
	// newProducts = new ArrayList<>();
	// for (Product p : products) {
	// if (uniqueCategory.equalsIgnoreCase(p.getCategory().getName())) {
	// newProducts.add(p);
	// }
	// }
	// inventory.put(uniqueCategory, newProducts);
	// }
	// return inventory;
	// }

	// @Override
	// public byte[] downloadInventory(Map<String, List<Product>> products)
	// throws IOException {
	// // List<Product> products = repository.downloadInventory(); // Get all
	// // records
	// // of products
	// return generateExcel(products); // Create Excel
	// }
	//
	// private byte[] generateExcel(Map<String, List<Product>> productMap)
	// throws IOException {
	//
	// // Create a Workbook
	// @SuppressWarnings("resource")
	// Workbook workbook = new XSSFWorkbook();
	// // Create a Sheet
	// Sheet sheet = workbook.createSheet("Inventory");
	// int previousRowId = -1;
	// // Create a Font for styling header cells
	// Font headerFont = workbook.createFont();
	// headerFont.setBold(true);
	// headerFont.setFontHeightInPoints((short) 14);
	// headerFont.setColor(IndexedColors.RED.getIndex());
	//
	// // Create a CellStyle with the font
	// CellStyle headerCellStyle = workbook.createCellStyle();
	// headerCellStyle.setFont(headerFont);
	//
	// // Create a Row
	// Row headerRow = sheet.createRow(0);
	// // Create cells
	// for (int i = 0; i < columns.length; i++) {
	// Cell cell = headerRow.createCell(i);
	// cell.setCellValue(columns[i]);
	// cell.setCellStyle(headerCellStyle);
	// }
	//
	// Set<String> keys = productMap.keySet();
	// if (productMap.size() > 0) {
	// for (String k : keys) {
	// List<Product> products = productMap.get(k);
	// for (int p = 0; p < products.size(); p++) {
	// if (previousRowId < 0) {
	// Row row = sheet.createRow(rowNumber);
	// row.createCell(0).setCellValue(products.get(p).getCategory().getName());
	// mergeRow(sheet, rowNumber); // Merge column cells into
	// // one
	// generateRow(sheet, products, p); // generate row
	// } else {
	// if (previousRowId > 0 && previousRowId !=
	// products.get(p).getCategory().getId()) {
	// Row row = sheet.createRow(rowNumber);
	// row.createCell(0).setCellValue(products.get(p).getCategory().getName());
	// mergeRow(sheet, rowNumber); // Merge column cells
	// // into one
	// generateRow(sheet, products, p); // generate row
	// } else {
	// Row subrow = sheet.createRow(rowNumber);
	// // TODO
	// subrow.createCell(0).setCellValue(products.get(p).getName());
	// // subrow.createCell(1).setCellValue(products.get(p).getInventory());
	// //
	// subrow.createCell(2).setCellValue(products.get(p).getMinimumAvailability());
	// // subrow.createCell(3).setCellValue(products.get(p).getCurrentStock());
	// rowNumber++;
	// }
	// }
	// try {
	// previousRowId = products.get(p).getCategory().getId(); // Store
	// // last
	// // record
	// // category
	// // id
	// } catch (Exception e) {
	// log.error("Error", e);
	// }
	// }
	// }
	// }
	//
	// rowNumber = 1; // Should start from first line of excel sheet
	// // Resize all columns to fit the content size
	// for (int i = 0; i < columns.length; i++) {
	// sheet.autoSizeColumn(i);
	// }
	//
	// ByteArrayOutputStream os = new ByteArrayOutputStream();
	// workbook.write(os);
	// return os.toByteArray();
	// }
	//
	// private void generateRow(Sheet sheet, List<Product> products, int p) {
	// if (!products.isEmpty()) {
	// Row subrow = sheet.createRow(++rowNumber);
	// // TODO
	// subrow.createCell(0).setCellValue(products.get(p).getName());
	// // subrow.createCell(1).setCellValue(products.get(p).getInventory());
	// //
	// subrow.createCell(2).setCellValue(products.get(p).getMinimumAvailability());
	// // subrow.createCell(3).setCellValue(products.get(p).getCurrentStock());
	// rowNumber++;
	// }
	//
	// }
	//
	// private void mergeRow(Sheet sheet, int rowIndex) {
	// sheet.addMergedRegion(new CellRangeAddress(rowIndex, // first row
	// // (0-based)
	// rowIndex, // last row (0-based)
	// 0, // first column (0-based)
	// 3 // last column (0-based)
	// ));
	// }
	//
	@Override
	public List<Product> getByCategoryId(Integer id) {
		try {
			return repository.findByCategoryId(id);
		} catch (Exception e) {
			throw new ValidationException(e.getMessage());
		}

	}

}
