package com.mbgarage.rpt.service.dto;


import java.time.LocalDate;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A DTO for the RestorationQuery entity.
 */
public class RestorationQueryDTO implements Serializable {

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
    private String description;

    private Long customerId;

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

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Long getCustomerId() {
        return customerId;
    }

    public void setCustomerId(Long userExtId) {
        this.customerId = userExtId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        RestorationQueryDTO restorationQueryDTO = (RestorationQueryDTO) o;
        if(restorationQueryDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), restorationQueryDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "RestorationQueryDTO{" +
            "id=" + getId() +
            ", make='" + getMake() + "'" +
            ", model='" + getModel() + "'" +
            ", vin='" + getVin() + "'" +
            ", productionDate='" + getProductionDate() + "'" +
            ", description='" + getDescription() + "'" +
            "}";
    }
}
