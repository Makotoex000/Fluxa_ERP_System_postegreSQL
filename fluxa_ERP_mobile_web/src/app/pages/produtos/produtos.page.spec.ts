// src/app/pages/produtos/produtos.page.spec.ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProdutosPage } from './produtos.page';
import { UserService } from '../../services/user';
import { of } from 'rxjs';

  describe('ProdutosPage', () => {
  let component: ProdutosPage;
  let fixture: ComponentFixture<ProdutosPage>;

  // Criamos o spy do UserService para simular as chamadas de API
  const userServiceMock = jasmine.createSpyObj('UserService', ['listProducts']);

  beforeEach(async () => {
    // Definimos o retorno padrão como um Observable de array vazio
    // Isso evita que o ciclo de vida ionViewWillEnter quebre ao tentar carregar a tela
    userServiceMock.listProducts.and.returnValue(of([]));

    await TestBed.configureTestingModule({
      imports: [ProdutosPage], // Importado aqui por ser um componente Standalone
      providers: [
        { provide: UserService, useValue: userServiceMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ProdutosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});