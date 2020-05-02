# NGRX Compose

## Quick Start

- `npm i @spellcodes/ngrx-compose`
- Include `NgrxComposeModule` in your module
- Create `store/containers/my-container.container.ts`
- Compose your first container

  ```typescript
  @Injectable({ providedIn: "root" })
  export class EmployeeContainer {
    employeeListContainer:       ContainerShip<EmployeeListDTO>;
    employeeDetailsContainer:    ContainerShip<EmployeeListDTO>;
    employeeOfTheMonthContainer: ContainerShip<EmployeeOfTheMonthDTO>;

    constructor(private readonly ngrxComposeService: NgrxComposeService) {
      this.employeeListContainer = ({ company }) =>
        this.ngrxComposeService.createContainer(loadEmployeeList({ company }));

      this.employeeDetailsContainer = ({ company }) =>
        this.ngrxComposeService.createContainer(loadEmployeeDetails(), [
          this.employeeListContainer({ company }),
        ]);

      this.employeeOfTheMonthContainer = ({ userId, company }) =>
        this.ngrxComposeService.createContainer(
          loadEmployeeOfTheMonth({ userId }),
          [this.employeeDetailsContainer({ company })]
        );
    }
  }
  ```

- Start using it

  ```typescript
  export class MyComponent implements OnInit {

  constructor(
    private readonly ngrxCmposeService: NgrxComposeService,
    private readonly employeeContainer: EmployeeContainer,
  ) {}

  ngOnInit(): void {
    this.ngrxCmposeService.dispatch(
      this.employeeContainer.employeeOfTheMonth({
        userId: '1337',
        company: 'E Corp'
      }),
    );
  ```

## Usage and API

TODO
