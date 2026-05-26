package br.com.gommo.modules.collaborator.service;

import br.com.gommo.core.base.service.IBaseService;
import br.com.gommo.modules.collaborator.dto.CollaboratorRequestDto;
import br.com.gommo.modules.collaborator.dto.CollaboratorResponseDto;

public interface ICollaboratorService extends IBaseService<CollaboratorRequestDto, CollaboratorResponseDto> {

    java.util.List<CollaboratorResponseDto> findAdmitted();
}
