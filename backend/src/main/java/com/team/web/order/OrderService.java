package com.team.web.order;

import com.team.web.common.JpaService;
import com.team.web.user.User;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
public interface OrderService extends JpaService<Order> {
    Optional<Order> estiFirst(Order order);
    Order saveEstiFirst(User user, Order order);
    Order update(Order selectOrder);
    Optional<Order> findByImage(long orderId);

//    Order findUserById(long parseLong);
}
