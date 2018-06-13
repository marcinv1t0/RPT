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
 * A RestorationQuery.
 */
@Entity
@Table(name = "restoration_query")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class RestorationQuery implements Serializable {

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
    @Column(name = "description", nullable = false)
    private String description;

    @OneToMany(mappedBy = "query")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Photo> photos = new HashSet<>();

    @ManyToOne
    private UserExt customer;

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

    public RestorationQuery make(String make) {
        this.make = make;
        return this;
    }

    public void setMake(String make) {
        this.make = make;
    }

    public String getModel() {
        return model;
    }

    public RestorationQuery model(String model) {
        this.model = model;
        return this;
    }

    public void setModel(String model) {
        this.model = model;
    }

    public String getVin() {
        return vin;
    }

    public RestorationQuery vin(String vin) {
        this.vin = vin;
        return this;
    }

    public void setVin(String vin) {
        this.vin = vin;
    }

    public LocalDate getProductionDate() {
        return productionDate;
    }

    public RestorationQuery productionDate(LocalDate productionDate) {
        this.productionDate = productionDate;
        return this;
    }

    public void setProductionDate(LocalDate productionDate) {
        this.productionDate = productionDate;
    }

    public String getDescription() {
        return description;
    }

    public RestorationQuery description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Set<Photo> getPhotos() {
        return photos;
    }

    public RestorationQuery photos(Set<Photo> photos) {
        this.photos = photos;
        return this;
    }

    public RestorationQuery addPhoto(Photo photo) {
        this.photos.add(photo);
        photo.setQuery(this);
        return this;
    }

    public RestorationQuery removePhoto(Photo photo) {
        this.photos.remove(photo);
        photo.setQuery(null);
        return this;
    }

    public void setPhotos(Set<Photo> photos) {
        this.photos = photos;
    }

    public UserExt getCustomer() {
        return customer;
    }

    public RestorationQuery customer(UserExt userExt) {
        this.customer = userExt;
        return this;
    }

    public void setCustomer(UserExt userExt) {
        this.customer = userExt;
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
        RestorationQuery restorationQuery = (RestorationQuery) o;
        if (restorationQuery.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), restorationQuery.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "RestorationQuery{" +
            "id=" + getId() +
            ", make='" + getMake() + "'" +
            ", model='" + getModel() + "'" +
            ", vin='" + getVin() + "'" +
            ", productionDate='" + getProductionDate() + "'" +
            ", description='" + getDescription() + "'" +
            "}";
    }
}
