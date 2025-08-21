# Product Requirements Document: SIWE Authentication for Thoughtstream

**Version:** 1.0  
**Date:** July 30, 2025  
**Product:** Thoughtstream Notes Application  

## Product overview

### Document summary

This PRD outlines the implementation of Sign-In with Ethereum (SIWE) authentication for Thoughtstream, transforming it from a shared notes application into a user-specific, secure platform. The implementation will enable users to authenticate using their Ethereum wallets and access only their personal notes, while maintaining the existing lightweight and intuitive user experience.

### Product summary

Thoughtstream will integrate SIWE authentication to provide secure, decentralized user identification without requiring traditional username/password combinations. Users will connect their Ethereum wallets (MetaMask, WalletConnect, etc.) to access their personal note collection, ensuring privacy and data ownership while leveraging the existing React frontend and Node.js backend architecture.

## Goals

### Business goals

- **User privacy and security**: Implement secure authentication that protects user data and ensures note privacy
- **Decentralized identity adoption**: Position Thoughtstream as a Web3-native application leveraging blockchain technology for user authentication
- **Data ownership**: Enable users to have true ownership of their notes through wallet-based authentication
- **Market differentiation**: Stand out in the notes application market by offering decentralized authentication
- **Future monetization readiness**: Prepare infrastructure for potential token-gated features or premium services

### User goals

- **Secure note access**: Access personal notes securely without traditional passwords
- **Privacy assurance**: Ensure that personal notes remain private and accessible only to the authenticated user
- **Seamless wallet integration**: Connect existing Ethereum wallets without complex setup procedures
- **Cross-device access**: Access notes from any device by connecting the same wallet
- **Data portability**: Maintain control over personal data through decentralized authentication

### Non-goals

- **Multi-chain support**: Initial implementation will focus solely on Ethereum mainnet
- **Social features**: No sharing, collaboration, or social features in this phase
- **Mobile wallet support**: Desktop/browser-based wallets only in the initial implementation
- **Account recovery mechanisms**: Users are responsible for wallet security and recovery
- **Traditional authentication fallback**: No email/password authentication options will be provided

## User personas

### Primary user: Crypto-native knowledge worker

**Profile**: Tech-savvy professional who regularly uses cryptocurrency wallets and values data ownership and privacy. Frequently takes notes while researching, working with LLMs, or managing crypto-related tasks.

**Technical comfort**: High - comfortable with wallet connections, understands gas fees, and familiar with Web3 applications.

**Usage patterns**: Creates 5-15 notes per day, often switches between devices, values quick access and organization.

**Pain points**: Frustrated with traditional authentication methods, concerned about data privacy and centralized storage.

### Secondary user: Web3 enthusiast

**Profile**: Early adopter of blockchain technology who prefers decentralized applications over traditional alternatives. May not be a daily crypto user but appreciates the principles of decentralization.

**Technical comfort**: Medium to high - has used wallets before but may need guidance on connection processes.

**Usage patterns**: Occasional note-taking, primarily interested in the decentralized authentication approach.

**Pain points**: Wants to support Web3 applications but needs intuitive user experiences.

### Role-based access

**Authenticated users**: Full access to personal notes - create, read, update, delete operations on their own notes only.

**Unauthenticated users**: No access to the application - all functionality requires wallet authentication.

## Functional requirements

### Authentication requirements (Priority: High)

**FR-001**: SIWE message generation and verification
- Generate standard SIWE messages for wallet signing
- Verify signed messages on the backend
- Support message customization with application-specific nonce and domain

**FR-002**: Wallet connection support
- Support MetaMask browser extension
- Support WalletConnect protocol for mobile wallet connections
- Handle wallet connection errors gracefully

**FR-003**: Session management
- Create and manage user sessions after successful authentication
- Implement session token generation and validation
- Provide session persistence across browser sessions

### Data isolation requirements (Priority: High)

**FR-004**: User-scoped note operations
- Filter all note operations by authenticated user's wallet address
- Prevent cross-user data access through API endpoints
- Maintain user association with existing notes during migration

**FR-005**: Backend authentication middleware
- Validate session tokens on protected endpoints
- Extract user identity from authenticated requests
- Implement proper error handling for authentication failures

### User experience requirements (Priority: Medium)

**FR-006**: Wallet connection UI
- Provide clear wallet connection buttons and status indicators
- Display connected wallet address in a user-friendly format
- Show connection status and allow disconnection

**FR-007**: Error handling and user feedback
- Display clear error messages for connection failures
- Provide guidance for users without supported wallets
- Handle network switching requirements

### Data migration requirements (Priority: Medium)

**FR-008**: Existing notes handling
- Provide administrative interface for associating existing notes with users
- Implement data migration strategy for pre-authentication notes
- Ensure no data loss during the authentication implementation

## User experience

### Entry points

**Primary entry point**: Web application landing page with prominent "Connect Wallet" button replacing the current direct access to notes.

**Wallet selection**: Modal or dedicated page for selecting wallet connection method (MetaMask, WalletConnect).

**Authentication flow**: SIWE message signing interface integrated with selected wallet provider.

### Core experience

**Wallet connection**: Users click "Connect Wallet" and select their preferred wallet provider. The application generates a SIWE message that users sign with their wallet. Upon successful verification, users gain access to their personal note collection.

**Note management**: After authentication, the existing tabbed interface remains unchanged. Users create, edit, and manage notes exactly as before, but now see only their personal notes.

**Session persistence**: Users remain authenticated across browser sessions until they explicitly disconnect or their session expires.

### Advanced features

**Address display**: Show shortened wallet address (0x1234...5678) in the header with option to copy full address.

**Network status**: Display current Ethereum network and warn users if they're on an unsupported network.

**Disconnect functionality**: Allow users to disconnect their wallet and clear their session.

### UI/UX highlights

**Minimal disruption**: Authentication layer adds security without changing the core note-taking experience.

**Clear status indicators**: Always visible wallet connection status and user identity.

**Progressive enhancement**: Existing users see improved security while new users get a secure-by-default experience.

## Narrative

As a knowledge worker who values privacy and data ownership, I want to securely access my personal notes using my Ethereum wallet so that I can maintain control over my data while enjoying a seamless note-taking experience. When I visit Thoughtstream, I connect my MetaMask wallet, sign a simple message to prove my identity, and immediately access my personal collection of notes. I can create, edit, and organize my thoughts knowing that only I can access this information, and I can access the same notes from any device by connecting the same wallet. The authentication process feels natural and aligns with my Web3 values while the note-taking experience remains fast and intuitive.

## Success metrics

### User-centric metrics

**Authentication success rate**: 95% of wallet connection attempts should complete successfully within 30 seconds.

**User retention**: 80% of users who successfully authenticate should return within 7 days.

**Session duration**: Average authenticated session should last at least 30 minutes.

**Error resolution**: Users experiencing connection errors should resolve them within 2 attempts 90% of the time.

### Business metrics

**User adoption**: 100% of active users should transition to authenticated access within 30 days of release.

**Data security incidents**: Zero unauthorized access incidents to user notes.

**Support requests**: Authentication-related support requests should not exceed 5% of total user interactions.

### Technical metrics

**Authentication latency**: SIWE verification should complete in under 2 seconds.

**Session token validation**: API response times should remain under 200ms with authentication middleware.

**System uptime**: Authentication service should maintain 99.9% uptime.

**Database queries**: User-scoped queries should maintain current performance levels.

## Technical considerations

### Integration points

**Frontend wallet integration**: Integration with Web3 provider libraries (ethers.js or wagmi) for wallet connection and message signing.

**Backend SIWE verification**: Integration with SIWE library for message parsing and signature verification.

**Session storage**: Redis-based session storage leveraging existing Redis infrastructure.

**API middleware**: Authentication middleware integration with existing Express.js route handlers.

### Data storage and privacy

**User identification**: Wallet addresses stored as lowercase hex strings for consistent user identification.

**Note association**: Existing Note interface already includes optional userId field, requiring population during migration.

**Session data**: Minimal session data storage including wallet address, session expiration, and session token.

**Redis schema updates**: 
- User sessions: `session:{token}` -> `{walletAddress, expiresAt}`
- User notes index: `user_notes:{walletAddress}` -> Set of note IDs
- Existing note storage remains unchanged with userId population

### Scalability and performance

**Session management**: Redis-based sessions support horizontal scaling and fast token validation.

**Database queries**: User-scoped queries will be more efficient than current global note queries.

**Wallet provider rate limits**: Implement request queuing and retry logic for wallet provider API calls.

**Concurrent authentication**: Support multiple simultaneous authentication attempts without conflicts.

### Potential challenges

**Wallet compatibility**: Different wallet providers may have varying SIWE implementation details requiring careful testing.

**Network switching**: Users on incorrect Ethereum networks will need clear guidance and error handling.

**Session security**: Proper token generation, storage, and validation to prevent session hijacking.

**Migration complexity**: Associating existing notes with users requires careful planning to prevent data loss.

**Gas fees**: While SIWE signing doesn't require gas, users may be confused about this distinction.

## Milestones and sequencing

### Project estimate

**Total duration**: 6-8 weeks for complete implementation and testing.

**Team size**: 2-3 developers (1 backend-focused, 1 frontend-focused, 1 full-stack for integration).

**Testing phase**: 2 weeks for comprehensive testing including wallet compatibility and security validation.

### Suggested phases

**Phase 1: Backend authentication infrastructure (2 weeks)**
- Implement SIWE message generation and verification
- Create authentication middleware and session management
- Update note service for user-scoped operations
- Implement Redis schema changes

**Phase 2: Frontend wallet integration (2 weeks)**
- Implement wallet connection UI components
- Integrate Web3 provider libraries
- Create authentication flow and session management
- Implement error handling and user feedback

**Phase 3: Data migration and integration (1 week)**
- Implement existing notes migration strategy
- Test user-scoped note operations
- Integrate frontend and backend components
- Perform comprehensive integration testing

**Phase 4: Security testing and optimization (1-2 weeks)**
- Conduct security audit of authentication flow
- Performance testing with user-scoped queries
- Cross-browser and wallet compatibility testing
- Load testing for concurrent authentication

**Phase 5: Deployment and monitoring (1 week)**
- Production deployment preparation
- Monitoring and alerting setup
- User documentation and migration communication
- Post-deployment monitoring and bug fixes

## User stories

### Authentication user stories

**US-001: Wallet connection initiation**
- **Description**: As a user visiting Thoughtstream, I want to see a clear "Connect Wallet" button so that I can begin the authentication process.
- **Acceptance criteria**:
  - Landing page displays prominent "Connect Wallet" button
  - Button is disabled if no wallet is detected
  - Clicking button opens wallet selection interface
  - Clear messaging explains wallet requirement for access

**US-002: Wallet provider selection**
- **Description**: As a user, I want to choose my preferred wallet provider so that I can use my existing wallet for authentication.
- **Acceptance criteria**:
  - Interface displays MetaMask and WalletConnect options
  - Each option shows clear branding and description
  - Selection triggers appropriate connection method
  - Unavailable options are clearly marked as disabled

**US-003: SIWE message signing**
- **Description**: As a user, I want to sign a clear, understandable message so that I can authenticate securely with my wallet.
- **Acceptance criteria**:
  - SIWE message includes application domain and purpose
  - Message format follows SIWE standard specification
  - User can review message before signing
  - Signing process integrates seamlessly with wallet interface

**US-004: Authentication success handling**
- **Description**: As a user, I want to see confirmation of successful authentication and be directed to my notes so that I know the process completed successfully.
- **Acceptance criteria**:
  - Success message displays after signature verification
  - User is redirected to main notes interface
  - Wallet address is visible in application header
  - Session is established and persisted

**US-005: Authentication failure handling**
- **Description**: As a user, I want to understand why authentication failed and how to resolve the issue so that I can successfully access the application.
- **Acceptance criteria**:
  - Clear error messages for different failure types
  - Retry options for recoverable errors
  - Guidance for wallet setup or network issues
  - No sensitive error information exposed

### Session management user stories

**US-006: Session persistence**
- **Description**: As an authenticated user, I want my session to persist across browser sessions so that I don't need to reconnect my wallet frequently.
- **Acceptance criteria**:
  - Session remains active after browser close/reopen
  - Session expires after reasonable time period (24-48 hours)
  - Expired sessions require re-authentication
  - Session status is always visible to user

**US-007: Wallet disconnection**
- **Description**: As an authenticated user, I want to disconnect my wallet so that I can log out or switch accounts.
- **Acceptance criteria**:
  - Clear "Disconnect" option in user interface
  - Disconnection clears local session and storage
  - User is redirected to landing page after disconnection
  - Confirmation dialog prevents accidental disconnection

**US-008: Session validation**
- **Description**: As a user with an existing session, I want the application to validate my session automatically so that I can access my notes without re-authentication.
- **Acceptance criteria**:
  - Valid sessions allow direct access to notes interface
  - Invalid sessions redirect to authentication flow
  - Session validation occurs within 2 seconds
  - No user interaction required for valid sessions

### Note management user stories

**US-009: User-scoped note creation**
- **Description**: As an authenticated user, I want to create notes that are associated with my wallet address so that only I can access them.
- **Acceptance criteria**:
  - New notes are automatically associated with authenticated user
  - Note creation flow remains unchanged for user
  - Notes include userId field populated with wallet address
  - Created notes appear immediately in user's note list

**US-010: User-scoped note retrieval**
- **Description**: As an authenticated user, I want to see only my personal notes so that my privacy is maintained.
- **Acceptance criteria**:
  - API returns only notes associated with authenticated user
  - Note list displays only user's personal notes
  - No access to other users' notes through any interface
  - Empty state shown for users with no notes

**US-011: User-scoped note editing**
- **Description**: As an authenticated user, I want to edit only my own notes so that I cannot modify other users' content.
- **Acceptance criteria**:
  - Edit operations require note ownership validation
  - Only owned notes display edit interfaces
  - Unauthorized edit attempts return appropriate errors
  - Edit functionality works identically to current implementation

**US-012: User-scoped note deletion**
- **Description**: As an authenticated user, I want to delete only my own notes so that I can manage my content safely.
- **Acceptance criteria**:
  - Delete operations require note ownership validation
  - Only owned notes show delete options
  - Unauthorized delete attempts return appropriate errors
  - Deletion confirmation remains unchanged

### Error handling user stories

**US-013: Wallet not found handling**
- **Description**: As a user without a supported wallet, I want clear guidance on wallet installation so that I can access the application.
- **Acceptance criteria**:
  - Clear message when no wallet is detected
  - Links to wallet installation resources
  - List of supported wallet providers
  - Instructions for wallet setup

**US-014: Network mismatch handling**
- **Description**: As a user on an unsupported network, I want guidance on switching networks so that I can authenticate successfully.
- **Acceptance criteria**:
  - Detection of current network
  - Clear message about required network (Ethereum mainnet)
  - Instructions for network switching
  - Automatic retry after network change

**US-015: Connection timeout handling**
- **Description**: As a user experiencing connection timeouts, I want the ability to retry authentication so that temporary issues don't prevent access.
- **Acceptance criteria**:
  - Timeout detection within 30 seconds
  - Clear timeout error message
  - Retry button for new authentication attempt
  - Progress indicators during connection attempts

### User experience user stories

**US-016: Wallet address display**
- **Description**: As an authenticated user, I want to see my connected wallet address so that I can confirm my identity.
- **Acceptance criteria**:
  - Shortened address format (0x1234...5678) in header
  - Click to copy full address functionality
  - Tooltip showing full address on hover
  - Clear visual indication of authenticated state

**US-017: Connection status visibility**
- **Description**: As a user, I want to always know my connection status so that I understand my current authentication state.
- **Acceptance criteria**:
  - Visual indicator for connected/disconnected states
  - Network status display if applicable
  - Connection quality or status information
  - Consistent status visibility across all pages

**US-018: Seamless transition**
- **Description**: As an existing user, I want the authentication process to feel natural and not disrupt my note-taking workflow.
- **Acceptance criteria**:
  - Authentication adds security without changing core features
  - Note-taking interface remains identical after authentication
  - No performance degradation in note operations
  - Familiar keyboard shortcuts and interactions preserved

### Security user stories

**US-019: Secure session token handling**
- **Description**: As a user, I want my authentication session to be secure so that unauthorized parties cannot access my notes.
- **Acceptance criteria**:
  - Session tokens are cryptographically secure
  - Tokens expire after appropriate time periods
  - No sensitive information stored in client-side storage
  - Session invalidation on suspicious activity

**US-020: Protection against unauthorized access**
- **Description**: As a user, I want assurance that only I can access my notes so that my privacy is guaranteed.
- **Acceptance criteria**:
  - All API endpoints require valid authentication
  - User isolation is enforced at database level
  - No user enumeration or information leakage
  - Comprehensive authorization checks on all operations

**US-021: Secure authentication flow**
- **Description**: As a user, I want the authentication process to be secure against common attacks so that my wallet and data remain safe.
- **Acceptance criteria**:
  - SIWE messages include anti-replay protection
  - Message verification includes signature validation
  - No sensitive information logged or exposed
  - Protection against timing attacks and enumeration