package com.team.web.order;

import com.amazonaws.annotation.SdkTestInternalApi;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.team.web.file.File;
import com.team.web.user.User;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.List;

@Entity
@Getter
@Setter
@ToString(exclude = "file")
@NoArgsConstructor
@Table(name = "orderlist")
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "order_id")
    private Long orderId;
    @Column(name = "order_date")
    private LocalDate orderDate;
    @Column(name = "moving_date")
    private String movingDate;
    @Column(name = "moving_type")
    private String movingType;
    @Column(name = "moving_price")
    private String movingPrice;
    @Column(name = "payment_status")
    private String paymentStatus;
    @Column(name = "payment_method")
    private String paymentMethod;
    @Column(name = "payment_date")
    private LocalDate paymentDate;
    @Column(name = "square")
    private String square;
    @Column(name = "moving_to")
    private String movingTo;
    @Column(name = "moving_from")
    private String movingFrom;
    @Column(name = "moving_phone")
    private String movingPhone;
    @Column(name = "moving_name")
    private String movingName;
    @Column(name = "optional_addr_to")
    private String optionalAddrTo;
    @Column(name = "optional_addr_from")
    private String optionalAddrFrom;
    @Column(name = "moving_writer")
    private String movingWriter;
    @Column(name = "moving_detail")
    private String movingDetail;

 /*   @OneToMany(mappedBy = "order", cascade = CascadeType.ALL)
    private List<IzziFileDB> izziFileDBList;*/
    @JsonIgnore
    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL)
    private List<com.team.web.file.File> file;
    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;


    @Builder
    public Order(LocalDate orderDate,
                  String movingPrice,
                  String paymentStatus,
                  String paymentMethod,
                  LocalDate paymentDate,
                  String movingType,
                  String movingDate,
                 String square,
                  String movingTo,
                  String movingFrom,
                  String movingName,
                  String movingPhone,
                  String optionalAddrTo,
                  String optionalAddrFrom,
                  String movingWriter,
                  String movingDetail,
                  User user
    ) {
        this.optionalAddrFrom = optionalAddrFrom;
        this.optionalAddrTo = optionalAddrTo;
        this.movingType = movingType;
        this.movingDate = movingDate;
        this.square = square;
        this.movingTo = movingTo;
        this.movingFrom = movingFrom;
        this.movingPhone = movingPhone;
        this.movingName = movingName;
        this.orderDate = orderDate;
        this.movingPrice = movingPrice;
        this.paymentStatus = paymentStatus;
        this.paymentMethod = paymentMethod;
        this.paymentDate = paymentDate;
        this.movingWriter = movingWriter;
        this.movingDetail = movingDetail;
        this.user = user;
    }

}

