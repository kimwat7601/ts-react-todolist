# Reactで以前作成したToDoリストアプリをリファクタリング

作成日：2025年5月4日

**2025年5月5日**

最小単位で動くところまで実装出来たので、一旦Claude（AI）にコードレビューを依頼。

---

# Todoリストアプリのコードレビュー

全体的に見て、JavaScriptからReact + TypeScriptへの移行が成功しています。以下に詳細なレビューを提供します。

## 1. コンポーネント設計 (8/10)

**良い点**:
- コンポーネントが適切に分離されている
- 再利用可能な低レベルコンポーネント（Button, InputText, CheckBox）
- 明確な責務の分離

**改善点**:
- `DataProps`の型定義が重複している（App.tsxとTodoList.tsxで同じ型を定義）
- コメントアウトされたコードの削除

## 2. TypeScript活用 (9/10)

**良い点**:
- HTMLコンポーネントの適切な型定義（`React.ButtonHTMLAttributes`など）
- propsの型定義が明確
- イベントハンドラーの型指定

**改善点**:
- 共通の型は別ファイルに抽出して再利用

```typescript
// types/todo.ts
export type TodoItem = {
  id: number;
  todoTxt: string;
  status: boolean;
}
```

## 3. 状態管理 (7/10)

**良い点**:
- React hooksの適切な使用
- state更新の不変性維持

**改善点**:
- `handleEntryClick`でDOM操作を直接行っている

```typescript
// 改善例：refs を使用
import { useRef } from 'react';

function App() {
  const inputRef = useRef<HTMLInputElement>(null);
  
  const handleEntryClick = (e:React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const taskTxt = inputRef.current?.value;
    if(!taskTxt) {
      return;
    };
    // ...
    inputRef.current.value = '';
  };
  
  // InputTextコンポーネントに ref を渡す
  <InputText
    ref={inputRef}
    className='todo-input-text'
    name='todo-input-text'
    placeholder='タスク内容'
  />
}
```

## 4. コンポーネント間の連携 (6/10)

**改善が必要な点**:
- `AddTaskForm`と`App`の間で緩い結合がある（DOM操作）
- フォーム自体がControlledコンポーネントになっていない

```typescript
// 改善例：AddTaskFormを制御されたコンポーネントに
const AddTaskForm: FC<AddTaskFormProps> = ({onSubmit}) => {
  const [inputValue, setInputValue] = useState('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(inputValue);
    setInputValue('');
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <InputText
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <Button type="submit">登録</Button>
    </form>
  );
};
```

## 5. セキュリティと最適化 (8/10)

**良い点**:
- 入力の検証（空文字チェック）
- key属性の適切な使用

**推奨改善**:
- XSS対策（現在は問題ないが、将来的に安全）
- 大規模データでのパフォーマンス最適化（useCallback, useMemo）

## 総合評価と推奨改善

**総合点: 38/50**

このアプリケーションは基本的な機能を備えた、JavaScriptからReact + TypeScriptへの良い移行例です。

### 今すぐできる改善点

1. **DOM操作の削除**：直接的なDOM操作を避け、Reactの状態管理パターンを活用
2. **型定義の一元化**：共通の型定義をtypes/ディレクトリに配置
3. **uncontrolledからcontrolledへ**：フォームコンポーネントを制御されたコンポーネントに変更

### 推奨の状態管理パターン

状態管理の基本パターンを改善することで、アプリケーションの保守性が向上します：

```typescript
// より良い状態管理パターン
const App = () => {
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [inputValue, setInputValue] = useState('');
  
  const addTodo = useCallback((text: string) => {
    if (!text.trim()) return;
    
    setTodos(prev => [{
      id: Date.now(), // より簡単でユニークな方法
      todoTxt: text,
      status: false
    }, ...prev]);
  }, []);
  
  return (
    <AddTaskForm 
      value={inputValue}
      onChange={setInputValue}
      onSubmit={addTodo}
    />
  );
};
```

全体として、優れたコード構造を持ち、React開発のベストプラクティスに沿う準備ができています。主要なフレームワークやパターンへの理解が感じられます。

---

方向性としては間違っていないよう。

## 自分なりの課題

- Reactのhookを少しずつ理解する。特にuseStateしか使っていないので、あとの7つもアプリを作成しながら少しずつ覚えていく
- Reactの型が全然わからないので、これも少しずつ慣れていく。ハンズオンでプログラムを理解しても、だいたい自分で開発するときに使い方を理解していないので戸惑うことが多い
- コンポーネントの設計を、はじめからある程度見通せるところまで慣れていく