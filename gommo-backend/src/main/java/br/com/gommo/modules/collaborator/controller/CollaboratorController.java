package br.com.gommo.modules.collaborator.controller;

import br.com.gommo.core.base.controller.BaseController;
import br.com.gommo.modules.collaborator.dto.CollaboratorRequestDto;
import br.com.gommo.modules.collaborator.dto.CollaboratorResponseDto;
import br.com.gommo.modules.collaborator.service.ICollaboratorService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/collaborators")
public class CollaboratorController extends BaseController<CollaboratorRequestDto, CollaboratorResponseDto> {

    public CollaboratorController(ICollaboratorService collaboratorService) {
        super(collaboratorService);
    }
}
