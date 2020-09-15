package com.team.web.dummy;

import com.team.web.order.Order;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/dummy")
public class DummyController {
    @Autowired DummyService dummyService;

    @PostMapping("/order-list")
    public ResponseEntity<List<Order>> createRandomOrder(){
        List<Order> randomOrderList= dummyService.createRandomOrder();
        return ResponseEntity.ok(randomOrderList);
    }
}
