package com.mbgarage.rpt.service.mapper;

import com.mbgarage.rpt.domain.*;
import com.mbgarage.rpt.service.dto.RestorationDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Restoration and its DTO RestorationDTO.
 */
@Mapper(componentModel = "spring", uses = {CarMapper.class})
public interface RestorationMapper extends EntityMapper<RestorationDTO, Restoration> {

    @Mapping(source = "car.id", target = "carId")
    RestorationDTO toDto(Restoration restoration);

    @Mapping(target = "repairs", ignore = true)
    @Mapping(source = "carId", target = "car")
    Restoration toEntity(RestorationDTO restorationDTO);

    default Restoration fromId(Long id) {
        if (id == null) {
            return null;
        }
        Restoration restoration = new Restoration();
        restoration.setId(id);
        return restoration;
    }
}
