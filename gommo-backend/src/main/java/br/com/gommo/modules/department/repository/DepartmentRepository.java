package br.com.gommo.modules.department.repository;

import br.com.gommo.core.base.repository.IBaseRepository;
import br.com.gommo.modules.department.entity.Department;
import org.springframework.stereotype.Repository;


@Repository
public interface DepartmentRepository extends IBaseRepository<Department> {
}
