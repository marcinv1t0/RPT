package com.mbgarage.rpt.service.mapper;

import com.mbgarage.rpt.domain.*;
import com.mbgarage.rpt.service.dto.RepairDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Repair and its DTO RepairDTO.
 */
@Mapper(componentModel = "spring", uses = {RestorationMapper.class})
public interface RepairMapper extends EntityMapper<RepairDTO, Repair> {

    @Mapping(source = "restoration.id", target = "restorationId")
    RepairDTO toDto(Repair repair);

    @Mapping(target = "subtasks", ignore = true)
    @Mapping(target = "photos", ignore = true)
    @Mapping(source = "restorationId", target = "restoration")
    Repair toEntity(RepairDTO repairDTO);

    default Repair fromId(Long id) {
        if (id == null) {
            return null;
        }
        Repair repair = new Repair();
        repair.setId(id);
        return repair;
    }
}
