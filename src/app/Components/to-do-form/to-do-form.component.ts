import { Component, OnInit } from '@angular/core';
import { Tasks } from 'src/core/models/tasks.model';
import { Router } from "@angular/router";
import { ConfirmationService, MessageService } from 'primeng/api';
import { ResponseStatus } from 'src/core/models/response/base-response.model';
import { ApiService } from "../../../core/services/api/api.service";
import { addTaskRequest } from 'src/core/models/request/addTask-request.model';

@Component({
  selector: 'app-to-do-form',
  templateUrl: './to-do-form.component.html',
  styleUrls: ['./to-do-form.component.scss'],
  providers: [MessageService, ConfirmationService]
})
export class ToDoFormComponent implements OnInit {

  public taskRequest: addTaskRequest = <addTaskRequest>{}
  tasksEditDialog: boolean = false;//kapalı kalması için false
  tasksAddDialog: boolean = false;
  TasksToEdit: Tasks | null = null;

  openModel: boolean = false;

  //Complated
  makeFalse: Tasks | null = null;

  constructor(
    private readonly apiService: ApiService,
    private router: Router,
    private messageService: MessageService
  ) { }

  tasks: Tasks[] = [];



  ngOnInit() {
    this.refresh()
  }


  refresh() {
    this.apiService.getAllEntities(Tasks).subscribe((response) => {
      this.tasks = response.data;
      console.log(this.tasks)
    });

  }





  onCreate(entity: addTaskRequest) {
    this.createEntity<addTaskRequest>(entity, 'Tasks').then(response => {
      if (response?.status == ResponseStatus.Ok) {
        this.refresh();
        this.messageService.add({ severity: 'success', summary: 'Başarılı', detail: 'Task ekleme başarılı', life: 3000 });
      }
    });
  }

  createEntity<TEntity>(entity: TEntity, entityType: string) {
    return this.apiService.createEntity<TEntity>(entity, entityType);
  }

  updateToFalse(id: number) {
    this.apiService.getEntityById<Tasks>(id, Tasks).then((response) => {
      if (response && response.data) {
        this.makeFalse = response.data;
        if (this.makeFalse?.status === 0) {
          this.makeFalse.status = 1; // 0'dan 1'e güncelle (0: Not Completed, 1: Completed)
        } else if (this.makeFalse?.status === 1) {
          this.makeFalse.status = 0; // 1'den 0'a güncelle (0: Not Completed, 1: Completed)
        }
  
        this.onUpdate(id, this.makeFalse);
  
        // Assuming you have a way to visually represent the tasks with a class like "task-item"
        const taskElement = document.getElementById(`task-${id}`);
        if (taskElement) {
          if (this.makeFalse.status === 1) {
            taskElement.classList.add('completed-task'); // Add a CSS class for Completed tasks (e.g., "completed-task" with green color)
          } else {
            taskElement.classList.remove('completed-task');
          }
        }
      } else {
        console.log("Kullanıcı bulunamadı veya bir hata oluştu.");
      }
    });
  }

  onUpdate(id: number, updatedUser: Tasks) {
    this.update(id, updatedUser).then(response => {
      if (response?.status == ResponseStatus.Ok) {
        this.refresh();
        this.messageService.add({ severity: 'success', summary: 'Başarılı', detail: 'Kullanıcı güncelleme başarılı', life: 3000 });

      }
    }).catch((error) => {
      console.error('Task güncellenirken bir hata oluştu:', error);
    });
  }

  deleteTask(id: number) {
    this.delete(id).then(response => {
      if (response?.status == ResponseStatus.Ok) {
        this.refresh();
        this.messageService.add({ severity: 'success', summary: 'Başarılı', detail: 'Task başarı ile silindi', life: 3000 });
      }
    })
  }

  editTask(id: number) {
    this.apiService.getEntityById<Tasks>(id, Tasks).then((response) => {
      if (response && response.data) {
        this.tasksEditDialog = true;
        this.TasksToEdit = response.data; // API'den alınan aracı carToEdit değişkenine atıyoruz
      } else {
        console.error('Kullanıcı bulunamadı veya alınırken bir hata oluştu.');
      }
    }).catch((error) => {
      console.error('Kullanıcı alınırken bir hata oluştu:', error);
    });
  }



  delete(id: number) {
    return this.apiService.deleteEntity(id, Tasks);
  }

  update(id: number, updatedTask: Tasks) {
    return this.apiService.updateEntity(id, updatedTask, Tasks);
  }

  hideDialog() {
    this.tasksEditDialog = false;
  }

  closeModal() {
    this.openModel = false;
  }

  modelOpen() {
    this.openModel = true;
  }

}
