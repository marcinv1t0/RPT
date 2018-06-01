package com.mbgarage.rpt.service.dto;


import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;
import com.mbgarage.rpt.domain.enumeration.AcountType;

/**
 * A DTO for the UserExt entity.
 */
public class UserExtDTO implements Serializable {

    private Long id;

    @Size(max = 15)
    private String phoneNumber;

    @NotNull
    private AcountType acountType;

    private Long userId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public AcountType getAcountType() {
        return acountType;
    }

    public void setAcountType(AcountType acountType) {
        this.acountType = acountType;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        UserExtDTO userExtDTO = (UserExtDTO) o;
        if(userExtDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), userExtDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "UserExtDTO{" +
            "id=" + getId() +
            ", phoneNumber='" + getPhoneNumber() + "'" +
            ", acountType='" + getAcountType() + "'" +
            "}";
    }
}
