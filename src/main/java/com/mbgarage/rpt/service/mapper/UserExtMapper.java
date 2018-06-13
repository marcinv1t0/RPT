package com.mbgarage.rpt.service.mapper;

import com.mbgarage.rpt.domain.*;
import com.mbgarage.rpt.service.dto.UserExtDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity UserExt and its DTO UserExtDTO.
 */
@Mapper(componentModel = "spring", uses = {UserMapper.class})
public interface UserExtMapper extends EntityMapper<UserExtDTO, UserExt> {

    @Mapping(source = "user.id", target = "userId")
    UserExtDTO toDto(UserExt userExt);

    @Mapping(source = "userId", target = "user")
    @Mapping(target = "senderMessages", ignore = true)
    @Mapping(target = "cars", ignore = true)
    @Mapping(target = "queries", ignore = true)
    UserExt toEntity(UserExtDTO userExtDTO);

    default UserExt fromId(Long id) {
        if (id == null) {
            return null;
        }
        UserExt userExt = new UserExt();
        userExt.setId(id);
        return userExt;
    }
}
