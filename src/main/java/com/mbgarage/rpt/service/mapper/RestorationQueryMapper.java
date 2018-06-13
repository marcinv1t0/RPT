package com.mbgarage.rpt.service.mapper;

import com.mbgarage.rpt.domain.*;
import com.mbgarage.rpt.service.dto.RestorationQueryDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity RestorationQuery and its DTO RestorationQueryDTO.
 */
@Mapper(componentModel = "spring", uses = {UserExtMapper.class})
public interface RestorationQueryMapper extends EntityMapper<RestorationQueryDTO, RestorationQuery> {

    @Mapping(source = "customer.id", target = "customerId")
    RestorationQueryDTO toDto(RestorationQuery restorationQuery);

    @Mapping(target = "photos", ignore = true)
    @Mapping(source = "customerId", target = "customer")
    RestorationQuery toEntity(RestorationQueryDTO restorationQueryDTO);

    default RestorationQuery fromId(Long id) {
        if (id == null) {
            return null;
        }
        RestorationQuery restorationQuery = new RestorationQuery();
        restorationQuery.setId(id);
        return restorationQuery;
    }
}
