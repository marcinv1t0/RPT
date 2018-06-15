package com.mbgarage.rpt.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.Objects;

/**
 * A Photo.
 */
@Entity
@Table(name = "photo")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Photo implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Lob
    @Column(name = "single_photo", nullable = false)
    private byte[] singlePhoto;

    @Column(name = "single_photo_content_type", nullable = false)
    private String singlePhotoContentType;

    @Column(name = "description")
    private String description;

    @NotNull
    @Column(name = "photo_date", nullable = false)
    private LocalDate photoDate;

    @ManyToOne
    private Car car;

    @ManyToOne
    private Repair repair;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public byte[] getSinglePhoto() {
        return singlePhoto;
    }

    public Photo singlePhoto(byte[] singlePhoto) {
        this.singlePhoto = singlePhoto;
        return this;
    }

    public void setSinglePhoto(byte[] singlePhoto) {
        this.singlePhoto = singlePhoto;
    }

    public String getSinglePhotoContentType() {
        return singlePhotoContentType;
    }

    public Photo singlePhotoContentType(String singlePhotoContentType) {
        this.singlePhotoContentType = singlePhotoContentType;
        return this;
    }

    public void setSinglePhotoContentType(String singlePhotoContentType) {
        this.singlePhotoContentType = singlePhotoContentType;
    }

    public String getDescription() {
        return description;
    }

    public Photo description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public LocalDate getPhotoDate() {
        return photoDate;
    }

    public Photo photoDate(LocalDate photoDate) {
        this.photoDate = photoDate;
        return this;
    }

    public void setPhotoDate(LocalDate photoDate) {
        this.photoDate = photoDate;
    }

    public Car getCar() {
        return car;
    }

    public Photo car(Car car) {
        this.car = car;
        return this;
    }

    public void setCar(Car car) {
        this.car = car;
    }

    public Repair getRepair() {
        return repair;
    }

    public Photo repair(Repair repair) {
        this.repair = repair;
        return this;
    }

    public void setRepair(Repair repair) {
        this.repair = repair;
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
        Photo photo = (Photo) o;
        if (photo.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), photo.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Photo{" +
            "id=" + getId() +
            ", singlePhoto='" + getSinglePhoto() + "'" +
            ", singlePhotoContentType='" + getSinglePhotoContentType() + "'" +
            ", description='" + getDescription() + "'" +
            ", photoDate='" + getPhotoDate() + "'" +
            "}";
    }
}
