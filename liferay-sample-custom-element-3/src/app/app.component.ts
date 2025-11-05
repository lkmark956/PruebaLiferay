/**
 * SPDX-FileCopyrightText: (c) 2000 Liferay, Inc. https://liferay.com
 * SPDX-License-Identifier: LGPL-2.1-or-later OR LicenseRef-Liferay-DXP-EULA-2.0.0-2023-06
 */

import {Component, Input} from '@angular/core';

interface Task {
	id: number;
	name: string;
	status: 'Pendiente' | 'En Progreso' | 'Completada';
	priority: 'Baja' | 'Media' | 'Alta';
	createdAt: Date;
}

@Component({
	selector: 'liferay-sample-custom-element-3',
	styleUrls: ['./app.component.css'],
	templateUrl: './app.component.html',
})
export class AppComponent {
	@Input('title') title = 'Gestor de Tareas';
	
	tasks: Task[] = [
		{
			id: 1,
			name: 'Configurar entorno de desarrollo',
			status: 'Completada',
			priority: 'Alta',
			createdAt: new Date('2024-11-01')
		},
		{
			id: 2,
			name: 'Diseñar interfaz de usuario',
			status: 'En Progreso',
			priority: 'Media',
			createdAt: new Date('2024-11-02')
		},
		{
			id: 3,
			name: 'Implementar funcionalidades',
			status: 'Pendiente',
			priority: 'Alta',
			createdAt: new Date('2024-11-03')
		}
	];
	
	newTaskName: string = '';
	newTaskPriority: 'Baja' | 'Media' | 'Alta' = 'Media';
	
	addTask() {
		if (this.newTaskName.trim()) {
			const newTask: Task = {
				id: Date.now(),
				name: this.newTaskName.trim(),
				status: 'Pendiente',
				priority: this.newTaskPriority,
				createdAt: new Date()
			};
			
			this.tasks.push(newTask);
			this.newTaskName = '';
			console.log('Nueva tarea agregada:', newTask);
		}
	}
	
	deleteTask(taskId: number) {
		this.tasks = this.tasks.filter(task => task.id !== taskId);
		console.log('Tarea eliminada con ID:', taskId);
	}
	
  updateTaskStatus(taskId: number, newStatus: 'Pendiente' | 'En Progreso' | 'Completada'): void {
    const task = this.tasks.find(t => t.id === taskId);
    if (task) {
      task.status = newStatus;
    }
  }

  onStatusChange(event: Event, taskId: number): void {
    const target = event.target as HTMLSelectElement;
    if (target && target.value) {
      this.updateTaskStatus(taskId, target.value as 'Pendiente' | 'En Progreso' | 'Completada');
    }
  }

  get totalTasks(): number {
    return this.tasks.length;
  }

  getStatusColor(status: string): string {
		switch (status) {
			case 'Completada': return '#10b981'; // Verde
			case 'En Progreso': return '#f59e0b'; // Amarillo
			case 'Pendiente': return '#6366f1'; // Azul
			default: return '#6b7280'; // Gris
		}
	}
	
	getPriorityColor(priority: string): string {
		switch (priority) {
			case 'Alta': return '#ef4444'; // Rojo
			case 'Media': return '#f59e0b'; // Amarillo
			case 'Baja': return '#10b981'; // Verde
			default: return '#6b7280'; // Gris
		}
	}
	
	get completedTasks(): number {
		return this.tasks.filter(task => task.status === 'Completada').length;
	}
	
	get inProgressTasks(): number {
		return this.tasks.filter(task => task.status === 'En Progreso').length;
	}
	
	get pendingTasks(): number {
		return this.tasks.filter(task => task.status === 'Pendiente').length;
	}
	
	handleClick() {
		console.log('Gestor de tareas funcionando correctamente');
		console.log('Total de tareas:', this.tasks.length);
		console.log('Estadísticas:', {
			completadas: this.completedTasks,
			enProgreso: this.inProgressTasks,
			pendientes: this.pendingTasks
		});
	}
}
