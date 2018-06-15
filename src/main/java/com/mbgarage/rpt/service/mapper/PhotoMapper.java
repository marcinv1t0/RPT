package com.mbgarage.rpt.service.mapper;

import com.mbgarage.rpt.domain.*;
import com.mbgarage.rpt.service.dto.PhotoDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Photo and its DTO PhotoDTO.
 */
@Mapper(componentModel = "spring", uses = {CarMapper.class, RepairMapper.class})
public interface PhotoMapper extends EntityMapper<PhotoDTO, Photo> {

    @Mapping(source = "car.id", target = "carId")
    @Mapping(source = "repair.id", target = "repairId")
    PhotoDTO toDto(Photo photo);

    @Mapping(source = "carId", target = "car")
    @Mapping(source = "repairId", target = "repair")
    Photo toEntity(PhotoDTO photoDTO);

    default Photo fromId(Long id) {
        if (id == null) {
            return null;
        }
        Photo photo = new Photo();
        photo.setId(id);
        return photo;
    }
}
