package com.mbgarage.rpt.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Car.
 */
@Entity
@Table(name = "car")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Car implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Size(max = 20)
    @Column(name = "make", length = 20, nullable = false)
    private String make;

    @NotNull
    @Size(max = 20)
    @Column(name = "model", length = 20, nullable = false)
    private String model;

    @Column(name = "vin")
    private String vin;

    @NotNull
    @Column(name = "production_date", nullable = false)
    private LocalDate productionDate;

    @NotNull
    @Size(max = 15)
    @Column(name = "color", length = 15, nullable = false)
    private String color;

    @OneToMany(mappedBy = "car")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Restoration> restorations = new HashSet<>();

    @ManyToOne
    private UserExt owner;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getMake() {
        return make;
    }

    public Car make(String make) {
        this.make = make;
        return this;
    }

    public void setMake(String make) {
        this.make = make;
    }

    public String getModel() {
        return model;
    }

    public Car model(String model) {
        this.model = model;
        return this;
    }

    public void setModel(String model) {
        this.model = model;
    }

    public String getVin() {
        return vin;
    }

    public Car vin(String vin) {
        this.vin = vin;
        return this;
    }

    public void setVin(String vin) {
        this.vin = vin;
    }

    public LocalDate getProductionDate() {
        return productionDate;
    }

    public Car productionDate(LocalDate productionDate) {
        this.productionDate = productionDate;
        return this;
    }

    public void setProductionDate(LocalDate productionDate) {
        this.productionDate = productionDate;
    }

    public String getColor() {
        return color;
    }

    public Car color(String color) {
        this.color = color;
        return this;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public Set<Restoration> getRestorations() {
        return restorations;
    }

    public Car restorations(Set<Restoration> restorations) {
        this.restorations = restorations;
        return this;
    }

    public Car addRestoration(Restoration restoration) {
        this.restorations.add(restoration);
        restoration.setCar(this);
        return this;
    }

    public Car removeRestoration(Restoration restoration) {
        this.restorations.remove(restoration);
        restoration.setCar(null);
        return this;
    }

    public void setRestorations(Set<Restoration> restorations) {
        this.restorations = restorations;
    }

    public UserExt getOwner() {
        return owner;
    }

    public Car owner(UserExt userExt) {
        this.owner = userExt;
        return this;
    }

    public void setOwner(UserExt userExt) {
        this.owner = userExt;
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
        Car car = (Car) o;
        if (car.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), car.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Car{" +
            "id=" + getId() +
            ", make='" + getMake() + "'" +
            ", model='" + getModel() + "'" +
            ", vin='" + getVin() + "'" +
            ", productionDate='" + getProductionDate() + "'" +
            ", color='" + getColor() + "'" +
            "}";
    }
}
