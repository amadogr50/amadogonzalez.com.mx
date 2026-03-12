# @bearbull/eslint-config

Shared ESLint configuration for the BearBull workspace.

## Usage

Install as a dev dependency and reference it in your `eslint.config.mjs`:

### Base Configuration

For general TypeScript/JavaScript projects:

```javascript
import { config } from '@bearbull/eslint-config/base';

export default [...config];
```

### React Native Configuration

For React Native and Expo apps:

```javascript
import { config } from '@bearbull/eslint-config/react-native';

export default [...config];
```
