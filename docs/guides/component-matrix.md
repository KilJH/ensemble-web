# Component Matrix

UI 컴포넌트의 Variant / Size / State 표준 매트릭스.

---

## 공통 규칙

### 토큰 사용

모든 컴포넌트는 semantic token 기반 클래스만 사용:

```tsx
// Background & Surface
(bg - bg, bg - surface, bg - surface - 2, bg - surface - elevated);

// Text
(text - text, text - text - muted, text - text - subtle);

// Border
border - border;

// Status Colors
(text - primary, bg - primary, text - danger, bg - danger);
(text - success, bg - success, text - warning, bg - warning);
(text - info, bg - info);
```

### State 처리

| State    | 클래스                                              |
| -------- | --------------------------------------------------- |
| Disabled | `opacity-50 cursor-not-allowed pointer-events-none` |
| Loading  | `opacity-70 cursor-wait pointer-events-none`        |
| Focus    | `focus-ring` (globals.css)                          |
| Error    | `border-danger focus:outline-danger`                |

### Size 토큰

| Size | Height | Padding | Text      |
| ---- | ------ | ------- | --------- |
| sm   | h-8    | px-3    | text-sm   |
| md   | h-10   | px-4    | text-base |
| lg   | h-12   | px-6    | text-lg   |

---

## Button

```tsx
import { Button, IconButton } from '@/components/ui';
```

### Variants

| Variant     | 설명               |
| ----------- | ------------------ |
| `primary`   | 메인 액션 (기본값) |
| `secondary` | 보조 액션          |
| `ghost`     | 투명 배경          |
| `outline`   | 테두리만           |
| `danger`    | 삭제/파괴적 액션   |
| `link`      | 링크 스타일        |

### Sizes

`sm` | `md` (기본값) | `lg`

### Props

```tsx
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline' | 'danger' | 'link';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}
```

### 사용 예시

```tsx
<Button variant="primary">확인</Button>
<Button variant="secondary" size="lg">보조</Button>
<Button variant="ghost" leftIcon={<PlusIcon />}>추가</Button>
<Button variant="danger" isLoading>삭제 중...</Button>
<Button variant="link">더 보기</Button>

<IconButton icon={<EditIcon />} aria-label="편집" />
<IconButton icon={<TrashIcon />} variant="danger" aria-label="삭제" />
```

---

## Input / Textarea

```tsx
import { Input, Textarea } from '@/components/ui';
```

### Variants

| Variant   | 설명                      |
| --------- | ------------------------- |
| `default` | 테두리 있는 기본 (기본값) |
| `filled`  | 배경 채움                 |
| `ghost`   | 투명                      |

### Sizes

`sm` | `md` (기본값) | `lg`

### Props

```tsx
interface InputProps {
  variant?: 'default' | 'filled' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  label?: string;
  error?: string;
  hint?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}
```

### 사용 예시

```tsx
<Input label="이메일" placeholder="example@email.com" />
<Input variant="filled" size="lg" label="이름" />
<Input error="8자 이상 입력하세요" label="비밀번호" type="password" />
<Input leftIcon={<SearchIcon />} placeholder="검색..." />

<Textarea label="메모" hint="선택 사항입니다" />
```

---

## Select

```tsx
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '@/components/ui';
```

### Variants

| Variant   | 설명                      |
| --------- | ------------------------- |
| `default` | 테두리 있는 기본 (기본값) |
| `filled`  | 배경 채움                 |
| `ghost`   | 투명                      |

### Sizes

`sm` | `md` (기본값) | `lg`

### Props (SelectTrigger)

```tsx
interface SelectTriggerProps {
  variant?: 'default' | 'filled' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  error?: boolean;
}
```

### 사용 예시

```tsx
<Select>
  <SelectTrigger variant="default" size="md">
    <SelectValue placeholder="선택하세요" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="1">옵션 1</SelectItem>
    <SelectItem value="2">옵션 2</SelectItem>
  </SelectContent>
</Select>
```

---

## Card

```tsx
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui';
```

### Variants

| Variant       | 설명                         |
| ------------- | ---------------------------- |
| `default`     | 그림자 있는 기본 (기본값)    |
| `bordered`    | 테두리만                     |
| `glass`       | 글래스모피즘                 |
| `interactive` | 호버/포커스 효과 (클릭 가능) |

### Padding

`none` | `sm` | `md` (기본값) | `lg`

### 사용 예시

```tsx
<Card variant="default">기본 카드</Card>
<Card variant="bordered">테두리 카드</Card>
<Card variant="glass">글래스 카드</Card>

<Card variant="interactive" onClick={() => {}}>
  <CardHeader>
    <CardTitle>클릭 가능한 카드</CardTitle>
  </CardHeader>
  <CardContent>호버하면 살짝 올라갑니다</CardContent>
</Card>
```

---

## Badge / Tag / Chip

```tsx
import { Badge, Tag, Chip } from '@/components/ui';
```

### Variants

| Variant     | 설명           |
| ----------- | -------------- |
| `default`   | 기본 (기본값)  |
| `primary`   | Primary 색상   |
| `secondary` | Secondary 색상 |
| `success`   | 성공           |
| `warning`   | 경고           |
| `danger`    | 오류           |
| `info`      | 정보           |
| `outline`   | 테두리만       |

### Sizes

`sm` | `md` (기본값) | `lg`

### 사용 예시

```tsx
<Badge variant="success">완료</Badge>
<Badge variant="warning" size="lg">주의</Badge>

<Tag variant="primary" onRemove={() => {}}>React</Tag>

<Chip selected>선택됨</Chip>
<Chip disabled>비활성</Chip>
```

---

## Checkbox / Radio

```tsx
import { Checkbox, RadioGroup, RadioGroupItem } from '@/components/ui';
```

### Sizes

`sm` | `md` (기본값)

### Props

```tsx
interface CheckboxProps {
  size?: 'sm' | 'md';
  label?: string;
  description?: string;
  error?: string;
}

interface RadioGroupItemProps {
  size?: 'sm' | 'md';
  label?: string;
  description?: string;
}
```

### 사용 예시

```tsx
<Checkbox label="약관에 동의합니다" />
<Checkbox size="sm" label="작은 체크박스" />
<Checkbox error="필수 항목입니다" label="동의" />

<RadioGroup>
  <RadioGroupItem value="1" label="옵션 1" />
  <RadioGroupItem value="2" label="옵션 2" />
</RadioGroup>
```

---

## Tabs

```tsx
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui';
```

### Variants

| Variant     | 설명               |
| ----------- | ------------------ |
| `underline` | 하단 라인 (기본값) |
| `pills`     | 필 형태            |

### Sizes

`sm` | `md` (기본값) | `lg`

### 사용 예시

```tsx
<Tabs defaultValue="tab1">
  <TabsList variant="underline">
    <TabsTrigger value="tab1">탭 1</TabsTrigger>
    <TabsTrigger value="tab2">탭 2</TabsTrigger>
  </TabsList>
  <TabsContent value="tab1">내용 1</TabsContent>
  <TabsContent value="tab2">내용 2</TabsContent>
</Tabs>

<Tabs defaultValue="a">
  <TabsList variant="pills" size="sm">
    <TabsTrigger value="a" variant="pills">A</TabsTrigger>
    <TabsTrigger value="b" variant="pills">B</TabsTrigger>
  </TabsList>
</Tabs>
```

---

## SegmentedControl

```tsx
import { SegmentedControl } from '@/components/ui';
```

### Sizes

`sm` | `md` (기본값) | `lg`

### 사용 예시

```tsx
const [view, setView] = useState<'list' | 'grid'>('list');

<SegmentedControl
  options={[
    { value: 'list', label: '목록' },
    { value: 'grid', label: '그리드' },
  ]}
  value={view}
  onChange={setView}
/>;
```

---

## Modal / AlertDialog

```tsx
import { Modal, ModalContent, AlertDialog } from '@/components/ui';
```

### Sizes

`sm` | `md` (기본값) | `lg` | `xl` | `full`

### AlertDialog Variants

| Variant   | 설명                    |
| --------- | ----------------------- |
| `default` | 기본 (Primary 버튼)     |
| `danger`  | 삭제 확인 (Danger 버튼) |

### 사용 예시

```tsx
<Modal>
  <ModalTrigger asChild>
    <Button>열기</Button>
  </ModalTrigger>
  <ModalContent size="lg">
    <ModalHeader>
      <ModalTitle>제목</ModalTitle>
    </ModalHeader>
    <p>내용</p>
  </ModalContent>
</Modal>

<AlertDialog
  open={open}
  onOpenChange={setOpen}
  title="삭제하시겠습니까?"
  description="이 작업은 되돌릴 수 없습니다."
  variant="danger"
  confirmLabel="삭제"
  onConfirm={handleDelete}
/>
```

---

## Drawer

```tsx
import { Drawer, DrawerContent, DrawerHeader, DrawerBody } from '@/components/ui';
```

### Sides

`left` | `right` (기본값) | `top` | `bottom`

### Sizes

`sm` | `md` (기본값) | `lg` | `xl` | `full`

### 사용 예시

```tsx
<Drawer>
  <DrawerTrigger asChild>
    <Button>메뉴</Button>
  </DrawerTrigger>
  <DrawerContent side="left" size="md">
    <DrawerHeader>
      <DrawerTitle>메뉴</DrawerTitle>
    </DrawerHeader>
    <DrawerBody>
      <nav>...</nav>
    </DrawerBody>
  </DrawerContent>
</Drawer>
```

---

## Alert

```tsx
import { Alert } from '@/components/ui';
```

### Variants

| Variant   | 설명          |
| --------- | ------------- |
| `info`    | 정보 (기본값) |
| `success` | 성공          |
| `warning` | 경고          |
| `danger`  | 오류          |

### Sizes

`sm` | `md` (기본값)

### 사용 예시

```tsx
<Alert variant="info" title="안내">
  새로운 기능이 추가되었습니다.
</Alert>

<Alert variant="danger" dismissible onDismiss={() => {}}>
  저장에 실패했습니다.
</Alert>
```

---

## 컴포넌트 매트릭스 요약

| 컴포넌트         | Variants | Sizes       | States              |
| ---------------- | -------- | ----------- | ------------------- |
| Button           | 6        | 3           | loading, disabled   |
| IconButton       | 6        | 3           | loading, disabled   |
| Input            | 3        | 3           | error, disabled     |
| Textarea         | 3        | 3           | error, disabled     |
| Select           | 3        | 3           | error, disabled     |
| Card             | 4        | 4 (padding) | focus (interactive) |
| Badge            | 8        | 3           | -                   |
| Tag              | 8        | 3           | -                   |
| Chip             | -        | 3           | selected, disabled  |
| Checkbox         | -        | 2           | error, disabled     |
| Radio            | -        | 2           | disabled            |
| Tabs             | 2        | 3           | disabled            |
| SegmentedControl | -        | 3           | disabled            |
| Modal            | -        | 5           | -                   |
| AlertDialog      | 2        | -           | loading             |
| Drawer           | 4 (side) | 5           | -                   |
| Alert            | 4        | 2           | dismissible         |

---

## 관련 문서

- [UI 가이드라인](./05-ui-guidelines.md) - 디자인 시스템, 색상
- [컴포넌트 가이드](./06-components.md) - 컴포넌트 사용법
