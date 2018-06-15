package com.mbgarage.rpt.service.dto;


import java.time.LocalDate;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;
import javax.persistence.Lob;

/**
 * A DTO for the Photo entity.
 */
public class PhotoDTO implements Serializable {

    private Long id;

    @NotNull
    @Lob
    private byte[] singlePhoto;
    private String singlePhotoContentType;

    private String description;

    @NotNull
    private LocalDate photoDate;

    private Long carId;

    private Long repairId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public byte[] getSinglePhoto() {
        return singlePhoto;
    }

    public void setSinglePhoto(byte[] singlePhoto) {
        this.singlePhoto = singlePhoto;
    }

    public String getSinglePhotoContentType() {
        return singlePhotoContentType;
    }

    public void setSinglePhotoContentType(String singlePhotoContentType) {
        this.singlePhotoContentType = singlePhotoContentType;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public LocalDate getPhotoDate() {
        return photoDate;
    }

    public void setPhotoDate(LocalDate photoDate) {
        this.photoDate = photoDate;
    }

    public Long getCarId() {
        return carId;
    }

    public void setCarId(Long carId) {
        this.carId = carId;
    }

    public Long getRepairId() {
        return repairId;
    }

    public void setRepairId(Long repairId) {
        this.repairId = repairId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        PhotoDTO photoDTO = (PhotoDTO) o;
        if(photoDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), photoDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "PhotoDTO{" +
            "id=" + getId() +
            ", singlePhoto='" + getSinglePhoto() + "'" +
            ", description='" + getDescription() + "'" +
            ", photoDate='" + getPhotoDate() + "'" +
            "}";
    }
}
