src/
├── main.ts                                # Application entry point (Helmet, Pino, CORS, Static Files)
├── app.module.ts                          # Database connection, Global Modules (Config, Logger,Throttler)
│
├── Shared/                                # Cross-cutting concerns & shared infrastructure
│   ├── AuthShared.module.ts               # Global JWT configuration
│   ├── Configs/
│   │   └── env.validation.ts              # Environment variables validation using Zod
│   ├── Decorators/
│   │   ├── GetUser.decorator.ts           # Extract user payload from request
│   │   └── Roles.decorator.ts             # Define allowed roles for endpoints
│   ├── Domain/
│   │   └── AggregateRoot.ts               # Base class for managing Domain Events
│   ├── Exceptions/
│   │   └── DomainException.ts             # Base class for domain-specific errors
│   ├── Filters/
│   │   └── DomainException.filter.ts      # Convert domain errors to standard HTTP responses
│   ├── Guards/
│   │   ├── JwtAuth.guard.ts               # Mandatory authentication guard
│   │   ├── OptionalJwtAuth.guard.ts       # Optional authentication (Guests allowed)
│   │   └── Roles.guard.ts                 # Role-Based Access Control (RBAC)
│   ├── Interceptors/
│   │   └── Transform.interceptor.ts       # Standardize API responses
│   ├── Storage/
│   │   ├── IStorage.service.ts            # File upload interface
│   │   └── LocalStorage.service.ts        # Local file storage implementation
│   └── Utils/
│       └── Hash.util.ts                   # Bcrypt password hashing utilities
│
└── Modules/                               # Business Domains (Bounded Contexts)
    │
    ├── User/                              # User Management Module
    │   ├── user.module.ts
    │   ├── Domain/
    │   │   ├── Entities/                  # User.entity.ts
    │   │   ├── Enums/                     # Role.enum.ts, Status.enum.ts
    │   │   ├── Events/                    # e.g., UserRegistered, PasswordChanged
    │   │   ├── Exceptions/                # e.g., InvalidEmail, UserNotFound
    │   │   ├── Repositories/              # IUserRepository
    │   │   └── ValueObjects/              # Email.vo.ts, Password.vo.ts, Username.vo.ts
    │   ├── Application/
    │   │   ├── Controllers/               # User.controller.ts
    │   │   ├── Dtos/                      # Login, Register, UpdateProfile
    │   │   ├── Mappers/                   # UserResponseMapper
    │   │   └── Services/                  # User.service.ts
    │   └── Infrastructure/
    │       ├── Mappers/                   # UserInfrastructureMapper
    │       ├── Repositories/              # UserRepositoryImpl
    │       └── Schemas/                   # User.schema.ts (Mongoose)
    │
    ├── Product/                           # Product & Category Module
    │   ├── product.module.ts
    │   ├── Domain/
    │   │   ├── Entities/                  # Product.entity.ts, Category.entity.ts
    │   │   ├── Enums/                     # ProductStatus.enum.ts
    │   │   ├── Events/                    # e.g., ProductCreated, StockChanged
    │   │   ├── Exceptions/                # e.g., InvalidPrice, OutOfStock
    │   │   ├── Repositories/              # IProductRepository, ICategoryRepository
    │   │   └── ValueObjects/              # Price.vo.ts, Stock.vo.ts, ProductId.vo.ts
    │   ├── Application/
    │   │   ├── Controllers/               # Product.controller.ts, Category.controller.ts
    │   │   ├── Dtos/                      # CreateProduct, UpdateProduct, CreateCategory
    │   │   ├── Mappers/                   # ProductResponseMapper
    │   │   └── Services/                  # Product.service.ts, Category.service.ts
    │   └── Infrastructure/
    │       ├── Mappers/                   # ProductInfrastructureMapper
    │       ├── Repositories/              # ProductRepositoryImpl, CategoryRepositoryImpl
    │       └── Schemas/                   # Product.schema.ts, Category.schema.ts
    │
    ├── Cart/                              # Shopping Cart Module
    │   ├── cart.module.ts
    │   ├── Domain/
    │   │   ├── Entities/                  # Cart.entity.ts
    │   │   ├── Events/                    # CartItemAdded, CartCleared
    │   │   ├── Exceptions/                # InvalidCartQuantity
    │   │   ├── Repositories/              # ICartRepository
    │   │   └── ValueObjects/              # CartItem.vo.ts
    │   ├── Application/
    │   │   ├── Controllers/               # Cart.controller.ts
    │   │   ├── Dtos/                      # AddToCart, UpdateCartItem
    │   │   ├── Mappers/                   # CartResponseMapper
    │   │   └── Services/                  # Cart.service.ts
    │   └── Infrastructure/
    │       ├── Mappers/                   # CartInfrastructureMapper
    │       ├── Repositories/              # CartRepositoryImpl
    │       └── Schemas/                   # Cart.schema.ts
    │
    ├── Order/                             # Order Management Module
    │   ├── order.module.ts
    │   ├── Domain/
    │   │   ├── Entities/                  # Order.entity.ts
    │   │   ├── Enums/                     # OrderStatus.enum.ts
    │   │   ├── Repositories/              # IOrderRepository
    │   │   └── ValueObjects/              # OrderItem.vo.ts, OrderId.vo.ts
    │   ├── Application/
    │   │   ├── Controllers/               # Order.controller.ts
    │   │   ├── Dtos/                      # Checkout, UpdateOrderStatus
    │   │   └── Services/                  # Order.service.ts
    │   └── Infrastructure/
    │       ├── Mappers/                   # OrderInfrastructureMapper
    │       ├── Repositories/              # OrderRepositoryImpl
    │       └── Schemas/                   # Order.schema.ts
    │
    └── Payment/                           # Payment Processing Module
        ├── payment.module.ts
        ├── Domain/
        │   ├── Entities/                  # Payment.entity.ts
        │   ├── Enums/                     # PaymentStatus, PaymentGateway
        │   ├── Events/                    # PaymentSucceeded.event.ts
        │   ├── Repositories/              # IPaymentRepository
        │   └── ValueObjects/              # IPaymentGateway (Bank Port)
        ├── Application/
        │   ├── Controllers/               # Payment.controller.ts
        │   ├── Dtos/                      # InitiatePayment, VerifyPayment
        │   └── Services/                  # Payment.service.ts
        └── Infrastructure/
            ├── Gateways/                  # MockPayment.gateway.ts
            ├── Mappers/                   # PaymentInfrastructureMapper
            ├── Repositories/              # PaymentRepositoryImpl
            └── Schemas/                   # Payment.schema.ts