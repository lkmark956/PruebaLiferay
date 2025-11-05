/**
 * SPDX-FileCopyrightText: (c) 2000 Liferay, Inc. https://liferay.com
 * SPDX-License-Identifier: LGPL-2.1-or-later OR LicenseRef-Liferay-DXP-EULA-2.0.0-2023-06
 */

import {TestBed} from '@angular/core/testing';
import {FormsModule} from '@angular/forms';

import {AppComponent} from './app.component';

describe('AppComponent', () => {
	beforeEach(() =>
		TestBed.configureTestingModule({
			declarations: [AppComponent],
			imports: [FormsModule],
		})
	);

	it('create the app', () => {
		const fixture = TestBed.createComponent(AppComponent);
		const app = fixture.componentInstance;
		expect(app).toBeTruthy();
	});

	it(`have as title 'Gestor de Tareas'`, () => {
		const fixture = TestBed.createComponent(AppComponent);
		const app = fixture.componentInstance;
		expect(app.title).toEqual('Gestor de Tareas');
	});

	it('should add a new task', () => {
		const fixture = TestBed.createComponent(AppComponent);
		const app = fixture.componentInstance;
		const initialCount = app.tasks.length;
		
		app.newTaskName = 'Nueva tarea de prueba';
		app.addTask();
		
		expect(app.tasks.length).toBe(initialCount + 1);
		expect(app.tasks[app.tasks.length - 1].name).toBe('Nueva tarea de prueba');
		expect(app.newTaskName).toBe('');
	});

	it('should delete a task', () => {
		const fixture = TestBed.createComponent(AppComponent);
		const app = fixture.componentInstance;
		const initialCount = app.tasks.length;
		const taskToDelete = app.tasks[0];
		
		app.deleteTask(taskToDelete.id);
		
		expect(app.tasks.length).toBe(initialCount - 1);
		expect(app.tasks.find(t => t.id === taskToDelete.id)).toBeUndefined();
	});

	it('should update task status', () => {
		const fixture = TestBed.createComponent(AppComponent);
		const app = fixture.componentInstance;
		const task = app.tasks[0];
		
		app.updateTaskStatus(task.id, 'Completada');
		
		expect(task.status).toBe('Completada');
	});

	it('should calculate task statistics correctly', () => {
		const fixture = TestBed.createComponent(AppComponent);
		const app = fixture.componentInstance;
		
		const completedCount = app.tasks.filter(t => t.status === 'Completada').length;
		const inProgressCount = app.tasks.filter(t => t.status === 'En Progreso').length;
		const pendingCount = app.tasks.filter(t => t.status === 'Pendiente').length;
		
		expect(app.completedTasks).toBe(completedCount);
		expect(app.inProgressTasks).toBe(inProgressCount);
		expect(app.pendingTasks).toBe(pendingCount);
	});

	it('render title', () => {
		const fixture = TestBed.createComponent(AppComponent);
		fixture.detectChanges();
		const compiled = fixture.nativeElement as HTMLElement;
		expect(compiled.querySelector('.main-title')?.textContent).toContain('Gestor de Tareas');
	});
});
