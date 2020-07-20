package com.istore.controller;

import com.istore.constants.ISTOREConstants;
import com.istore.model.GenericResponse;
import com.istore.model.OrderDetail;
import com.istore.model.OrderTotal;
import com.istore.service.OrderDetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;
import java.util.List;

@RestController
@CrossOrigin
@RequestMapping(ISTOREConstants.ORDER)
public class OrderDetailController {
    @Autowired
    OrderDetailService orderDetailService;

    @PostMapping(ISTOREConstants.CREATE)
    public ResponseEntity<OrderDetail> create(@RequestBody OrderDetail orders) {
        return new ResponseEntity<>(orderDetailService.create(orders), HttpStatus.OK);
    }

    @PutMapping(ISTOREConstants.UPDATE)
    public ResponseEntity<OrderDetail> update(@RequestBody OrderDetail order) {
        return new ResponseEntity<>(orderDetailService.update(order), HttpStatus.OK);
    }

    @DeleteMapping(ISTOREConstants.DELETE)
    public ResponseEntity<GenericResponse> delete(@RequestParam Integer id) {
        return new ResponseEntity<>(orderDetailService.delete(id), HttpStatus.OK);
    }

    @GetMapping(ISTOREConstants.GET)
    public ResponseEntity<OrderDetail> get(@RequestParam Integer id) {
        return new ResponseEntity<>(orderDetailService.get(id), HttpStatus.OK);
    }

    @GetMapping(ISTOREConstants.GET_ALL)
    public ResponseEntity<List<OrderDetail>> getAll() {
        return new ResponseEntity<>(orderDetailService.getAll(), HttpStatus.OK);
    }

    @GetMapping(ISTOREConstants.GET_TOTAL)
    public ResponseEntity<Float> getTotalByDate(@RequestParam(required = false) String from,
                                                @RequestParam(required = false) String to) throws ParseException {
        return new ResponseEntity<>(orderDetailService.getTotalByDate(from, to), HttpStatus.OK);
    }

    @GetMapping(ISTOREConstants.GET_TOTAL_BY_DAYS)
    public ResponseEntity<List<OrderTotal>> getTotalByDays(@RequestParam int days) throws ParseException {
        return new ResponseEntity<>(orderDetailService.getTotalByDays(days), HttpStatus.OK);
    }

    @GetMapping(ISTOREConstants.GET_TOTAL_RECORD_COUNT)
    public ResponseEntity<Integer> getTotalRecordsCount() {
        return new ResponseEntity<>(orderDetailService.getTotalRecordsCount(), HttpStatus.OK);
    }
}
