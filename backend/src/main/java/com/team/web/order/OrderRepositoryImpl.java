package com.team.web.order;

import com.querydsl.jpa.impl.JPAQueryFactory;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.support.QuerydslRepositorySupport;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
interface IOrderRepository{
    Optional<Order> findByOrderId(String id);
}
public class OrderRepositoryImpl extends QuerydslRepositorySupport implements IOrderRepository {
    @Autowired
    JPAQueryFactory queryFactory;
    OrderRepositoryImpl() {
        super(Order.class);
    }

    @Override
    public Optional<Order> findByOrderId(String id) {
        QOrder qOrder = QOrder.order;
        Order findOne = queryFactory.selectFrom(qOrder).where(qOrder.orderId.like(id)).fetchOne();
        System.out.println("order findByOrderId : " + findOne);
        return Optional.of(findOne);
    }
}
