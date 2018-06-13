package com.mbgarage.rpt.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

import com.mbgarage.rpt.domain.enumeration.AcountType;

/**
 * A UserExt.
 */
@Entity
@Table(name = "user_ext")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class UserExt implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    private Long id;

    @Size(max = 15)
    @Column(name = "phone_number", length = 15)
    private String phoneNumber;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "acount_type", nullable = false)
    private AcountType acountType;

    @OneToOne
    @JoinColumn(unique = true)
    private User user;

    @OneToMany(mappedBy = "sender")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Message> senderMessages = new HashSet<>();

    @OneToMany(mappedBy = "owner")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Car> cars = new HashSet<>();

    @OneToMany(mappedBy = "customer")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<RestorationQuery> queries = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public UserExt phoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
        return this;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public AcountType getAcountType() {
        return acountType;
    }

    public UserExt acountType(AcountType acountType) {
        this.acountType = acountType;
        return this;
    }

    public void setAcountType(AcountType acountType) {
        this.acountType = acountType;
    }

    public User getUser() {
        return user;
    }

    public UserExt user(User user) {
        this.user = user;
        return this;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Set<Message> getSenderMessages() {
        return senderMessages;
    }

    public UserExt senderMessages(Set<Message> messages) {
        this.senderMessages = messages;
        return this;
    }

    public UserExt addSenderMessage(Message message) {
        this.senderMessages.add(message);
        message.setSender(this);
        return this;
    }

    public UserExt removeSenderMessage(Message message) {
        this.senderMessages.remove(message);
        message.setSender(null);
        return this;
    }

    public void setSenderMessages(Set<Message> messages) {
        this.senderMessages = messages;
    }

    public Set<Car> getCars() {
        return cars;
    }

    public UserExt cars(Set<Car> cars) {
        this.cars = cars;
        return this;
    }

    public UserExt addCar(Car car) {
        this.cars.add(car);
        car.setOwner(this);
        return this;
    }

    public UserExt removeCar(Car car) {
        this.cars.remove(car);
        car.setOwner(null);
        return this;
    }

    public void setCars(Set<Car> cars) {
        this.cars = cars;
    }

    public Set<RestorationQuery> getQueries() {
        return queries;
    }

    public UserExt queries(Set<RestorationQuery> restorationQueries) {
        this.queries = restorationQueries;
        return this;
    }

    public UserExt addQuery(RestorationQuery restorationQuery) {
        this.queries.add(restorationQuery);
        restorationQuery.setCustomer(this);
        return this;
    }

    public UserExt removeQuery(RestorationQuery restorationQuery) {
        this.queries.remove(restorationQuery);
        restorationQuery.setCustomer(null);
        return this;
    }

    public void setQueries(Set<RestorationQuery> restorationQueries) {
        this.queries = restorationQueries;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        UserExt userExt = (UserExt) o;
        if (userExt.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), userExt.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "UserExt{" +
            "id=" + getId() +
            ", phoneNumber='" + getPhoneNumber() + "'" +
            ", acountType='" + getAcountType() + "'" +
            "}";
    }
}
