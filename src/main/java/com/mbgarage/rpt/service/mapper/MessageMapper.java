package com.mbgarage.rpt.service.mapper;

import com.mbgarage.rpt.domain.*;
import com.mbgarage.rpt.service.dto.MessageDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Message and its DTO MessageDTO.
 */
@Mapper(componentModel = "spring", uses = {UserExtMapper.class})
public interface MessageMapper extends EntityMapper<MessageDTO, Message> {

    @Mapping(source = "sender.id", target = "senderId")
    MessageDTO toDto(Message message);

    @Mapping(source = "senderId", target = "sender")
    Message toEntity(MessageDTO messageDTO);

    default Message fromId(Long id) {
        if (id == null) {
            return null;
        }
        Message message = new Message();
        message.setId(id);
        return message;
    }
}
