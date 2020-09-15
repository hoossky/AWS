package com.team.web.file;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.team.web.order.QOrder;
import org.springframework.data.jpa.repository.support.QuerydslRepositorySupport;
import org.springframework.stereotype.Repository;

import java.util.List;

interface IFileRepository {

    List<String> getFileName(Long orderId);
}
@Repository
public class FileRepositoryImpl extends QuerydslRepositorySupport implements IFileRepository {
    private final JPAQueryFactory queryFactory;

    public FileRepositoryImpl(JPAQueryFactory queryFactory) {
        super(File.class);
        this.queryFactory = queryFactory;
    }


    @Override
    public List<String> getFileName(Long orderId) {
        QFile qFile = QFile.file;
        QOrder qOrder = QOrder.order;
        return from(qFile).leftJoin(qOrder).on(qOrder.orderId.eq(qFile.order.orderId)).select(qFile.fileName).where(qOrder.orderId.eq(orderId)).fetch();
    }
}
