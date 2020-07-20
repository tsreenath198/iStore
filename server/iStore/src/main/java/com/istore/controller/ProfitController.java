package com.istore.controller;

import com.istore.constants.ISTOREConstants;
import com.istore.model.ProfitInterface;
import com.istore.service.ProfitService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;
import java.util.List;

@RestController
@CrossOrigin
@RequestMapping(ISTOREConstants.PROFIT)
public class ProfitController {
    @Autowired
    ProfitService profitService;

    @GetMapping(ISTOREConstants.GET_BY_CATEGORY)
    public ResponseEntity<List<ProfitInterface>> getProfitByCategory(@RequestParam String fromDate,
                                                                     @RequestParam String toDate) throws ParseException {
        return new ResponseEntity<>(profitService.getProfitByCategory(fromDate, toDate),
                HttpStatus.OK);
    }

    @GetMapping(ISTOREConstants.GET_BY_PRODUCT)
    public ResponseEntity<List<ProfitInterface>> getProductByProduct(@RequestParam String category,
                                                                     @RequestParam String fromDate, @RequestParam String toDate) {
        return new ResponseEntity<>(profitService.getProductByProduct(fromDate, toDate, category),
                HttpStatus.OK);
    }

}
