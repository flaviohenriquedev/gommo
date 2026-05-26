package br.com.gommo.modules.jobposition.repository;

import br.com.gommo.core.base.repository.IBaseRepository;
import br.com.gommo.modules.jobposition.entity.JobPosition;
import org.springframework.stereotype.Repository;


@Repository
public interface JobPositionRepository extends IBaseRepository<JobPosition> {
}
