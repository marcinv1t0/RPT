package com.mbgarage.rpt.service.mapper;

import com.mbgarage.rpt.domain.*;
import com.mbgarage.rpt.service.dto.SubTaskDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity SubTask and its DTO SubTaskDTO.
 */
@Mapper(componentModel = "spring", uses = {RepairMapper.class})
public interface SubTaskMapper extends EntityMapper<SubTaskDTO, SubTask> {

    @Mapping(source = "repair.id", target = "repairId")
    SubTaskDTO toDto(SubTask subTask);

    @Mapping(source = "repairId", target = "repair")
    SubTask toEntity(SubTaskDTO subTaskDTO);

    default SubTask fromId(Long id) {
        if (id == null) {
            return null;
        }
        SubTask subTask = new SubTask();
        subTask.setId(id);
        return subTask;
    }
}
