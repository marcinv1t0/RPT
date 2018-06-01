package com.mbgarage.rpt.service.mapper;

import com.mbgarage.rpt.domain.*;
import com.mbgarage.rpt.service.dto.CarDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Car and its DTO CarDTO.
 */
@Mapper(componentModel = "spring", uses = {UserExtMapper.class})
public interface CarMapper extends EntityMapper<CarDTO, Car> {

    @Mapping(source = "owner.id", target = "ownerId")
    CarDTO toDto(Car car);

    @Mapping(target = "restorations", ignore = true)
    @Mapping(source = "ownerId", target = "owner")
    Car toEntity(CarDTO carDTO);

    default Car fromId(Long id) {
        if (id == null) {
            return null;
        }
        Car car = new Car();
        car.setId(id);
        return car;
    }
}
