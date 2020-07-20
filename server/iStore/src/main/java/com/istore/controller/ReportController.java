package com.istore.controller;

import com.istore.constants.ISTOREConstants;
import com.istore.model.OrderDetail;
import com.istore.model.OrderDetailGroupInterface;
import com.istore.service.ReportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping(ISTOREConstants.REPORT)
public class ReportController {
    @Autowired
    ReportService reportService;

    @GetMapping(ISTOREConstants.GET_REPORT_TOTAL_BY_GROUP)
    public ResponseEntity<List<OrderDetailGroupInterface>> getTotalByGroup(@RequestParam String fromDate,
                                                                           @RequestParam String toDate, @RequestParam String groupBy) {
        return new ResponseEntity<>(
                reportService.getTotalByGroup(fromDate, toDate, groupBy), HttpStatus.OK);
    }

    @GetMapping(ISTOREConstants.GET_REPORT_TOTAL_BY_VALUE)
    public ResponseEntity<List<OrderDetailGroupInterface>> getTotalByValue(@RequestParam(required = false) String type,
                                                                           @RequestParam Integer value, @RequestParam(required = false) Integer month,
                                                                           @RequestParam(required = false) Integer year, @RequestParam String fromDate, @RequestParam String toDate) {
        return new ResponseEntity<>(
                reportService.getTotalByValue(type, value, month, year, fromDate, toDate), HttpStatus.OK);
    }

    @GetMapping(ISTOREConstants.GET_ALL_RECORDS_BY_DAY)
    public ResponseEntity<List<OrderDetail>> getAllRecordsByDay(@RequestParam Integer value,
                                                                @RequestParam(required = false) Integer month, @RequestParam(required = false) Integer year) {
        return new ResponseEntity<>(reportService.findAllRecordsByDay(value, month, year),
                HttpStatus.OK);
    }

}
