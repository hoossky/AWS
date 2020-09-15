package com.team.web.order;
import com.team.web.common.Box;

import com.team.web.user.User;

import com.team.web.user.UserService;
import lombok.AllArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;

@CrossOrigin(origins = "*",allowedHeaders = "*")
@RestController
@RequestMapping("/orders")
@AllArgsConstructor
public class OrderController {
    private final OrderService orderService;

    private final UserService userService;

    static Logger logger = LoggerFactory.getLogger(OrderController.class);
    @Autowired
    Box box;
    @Autowired
    OrderRepository orderRepository;

    @PostMapping("/esitmateform/{userId}")
    public ResponseEntity<Order> estiFirst(@PathVariable String userId, @RequestBody Order estiJsnon ){
        User user = userService.findUserById(Long.parseLong(userId));
        Order newOne = orderService.saveEstiFirst(user, estiJsnon);

        return ResponseEntity.ok(newOne);
    };

    //회원정보 변경
    @PatchMapping("/modifyform/{userId}")
    public ResponseEntity<Order> modifyForm(@PathVariable String userId,@RequestBody Order order){
        User user = userService.findUserById(Long.parseLong(userId));
        Order newOne = orderService.saveEstiFirst(user, order);
        Optional<Order> modifyOrder = orderService.findById(String.valueOf(order.getUser().getId()));
        if (modifyOrder.isPresent()) {
            Order selectOrder = modifyOrder.get();
            Optional.ofNullable(order.getMovingDate()).ifPresent(selectOrder::setMovingDate);
            Optional.ofNullable(order.getMovingDetail()).ifPresent(selectOrder::setMovingDetail);
            Optional.ofNullable(order.getMovingName()).ifPresent(selectOrder::setMovingName);
            return ResponseEntity.ok(orderService.update(selectOrder));
        }else {
            System.out.println("업데이트 실패");
            return ResponseEntity.notFound().build();
        }
    }

    // Estimate fetch all
    @GetMapping("/list")
    public Map<?,?> getAll(){
        Iterable<Order> orderList = orderService.findAll();
        System.out.println("자바확인");
        box.put("list",orderList);
        return box.get();
    }


    @GetMapping("/findUser/{id}")
    public Optional<Order> getOneUser(@PathVariable String id){
        System.out.println("자바확인 getOneUser");
        return orderService.findById(id);

    }
 /*   @PostMapping("/calculator")
    public ResponseEntity<Order> estiPrice(@RequestBody Order result) {
        Optional<Order> estiPrice = orderService.estiPrice(result);
        System.out.println("자바 들어옴");
        System.out.println(result.getMovingPrice());
        if (estiPrice.isPresent()) {
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.badRequest().build();
        }
    }*/


}

