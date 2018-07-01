package com.mbgarage.rpt.service.dto;


import java.time.LocalDate;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A DTO for the Car entity.
 */
public class CarRestorationDTO implements Serializable {

    private Long id;

    @NotNull
    @Size(max = 20)
    private String make;

    @NotNull
    @Size(max = 20)
    private String model;

    private String vin;

    @NotNull
    private LocalDate productionDate;

    @NotNull
    @Size(max = 15)
    private String color;

    private Long ownerId;

    private Long carId;

    @NotNull
    private LocalDate startDate;

    private LocalDate finishDate;

    public LocalDate getStartDate() {
        return startDate;
    }

    public void setStartDate(LocalDate startDate) {
        this.startDate = startDate;
    }

    public LocalDate getFinishDate() {
        return finishDate;
    }

    public void setFinishDate(LocalDate finishDate) {
        this.finishDate = finishDate;
    }

    public Long getCarId() {
        return carId;
    }

    public void setCarId(Long carId) {
        this.carId = carId;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getMake() {
        return make;
    }

    public void setMake(String make) {
        this.make = make;
    }

    public String getModel() {
        return model;
    }

    public void setModel(String model) {
        this.model = model;
    }

    public String getVin() {
        return vin;
    }

    public void setVin(String vin) {
        this.vin = vin;
    }

    public LocalDate getProductionDate() {
        return productionDate;
    }

    public void setProductionDate(LocalDate productionDate) {
        this.productionDate = productionDate;
    }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public Long getOwnerId() {
        return ownerId;
    }

    public void setOwnerId(Long userExtId) {
        this.ownerId = userExtId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        CarRestorationDTO carRestorationDTO = (CarRestorationDTO) o;
        if(carRestorationDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), carRestorationDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "CarDTO{" +
            "id=" + getId() +
            ", make='" + getMake() + "'" +
            ", model='" + getModel() + "'" +
            ", vin='" + getVin() + "'" +
            ", productionDate='" + getProductionDate() + "'" +
            ", color='" + getColor() + "'" +
            ", ownerId='" + getOwnerId() + "'" +
            ", carId='" + getCarId() + "'" +
            ", startDate='" + getStartDate() + "'" +
            ", finishDate='" + getFinishDate() + "'" +
            "}";
    }
}
