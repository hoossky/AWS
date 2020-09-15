package com.team.web.dummy;
/*
import com.team.web.estimate.Estimate;
import com.team.web.estimate.EstimateRepository;*/
import com.team.web.order.Order;
import com.team.web.order.OrderRepository;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Component
interface DummyService{

    List<Order> createRandomOrder();
}
@Service
public class DummyServiceImpl  implements  DummyService{
    private final OrderRepository orderRepository;
    public DummyServiceImpl(OrderRepository orderRepository){
        this.orderRepository= orderRepository;
    }
    @Override
    public List<Order> createRandomOrder() {
        return null;
       /* List<Order> orderList= new ArrayList<>();
        for(int i=0; i<1000;i++){
            Order order= new Order();
            order.setMovingType(RandomEstimatesGenerator.generateRandomMovingType());
            order.setMovingDate(RandomEstimatesGenerator.generateRandomJoinDate());
            order.setMovingPhone(RandomEstimatesGenerator.generateRandomPhone() +
                    RandomEstimatesGenerator.generateRandomPhoneNo()+RandomEstimatesGenerator.generateRandomPhoneNo());
            order.setSquare(RandomEstimatesGenerator.generateRandomSquare());
            order.setMovingName(RandomEstimatesGenerator.generateRandomName());
            order.setMovingFrom(RandomEstimatesGenerator.generateRandomAddress());
            order.setMovingTo(RandomEstimatesGenerator.generateRandomAddress());
            orderList.add(order);
        }
        return orderRepository.saveAll(orderList);*/
    }
}
