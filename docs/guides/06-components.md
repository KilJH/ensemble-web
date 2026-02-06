# 컴포넌트 가이드

## 구조

```
apps/web/src/components/
└── ui/                    # 기본 UI 컴포넌트
    ├── index.ts           # Barrel export
    ├── button.tsx
    ├── input.tsx
    └── ...
```

## 사용법

```tsx
// 권장: barrel export 사용
import { Button, Input, Card } from '@/components/ui';

// 개별 import (필요시)
import { Button } from '@/components/ui/button';
```

---

## 컴포넌트 목록

### Core

| 컴포넌트  | 설명          | Props                          |
| --------- | ------------- | ------------------------------ |
| `Button`  | 버튼          | `variant`, `size`, `isLoading` |
| `Input`   | 입력 필드     | `label`, `error`, `hint`       |
| `Card`    | 카드 컨테이너 | `variant`, `padding`           |
| `Sidebar` | 사이드바      | `collapsed`                    |

### Display

| 컴포넌트      | 설명             | Props                      |
| ------------- | ---------------- | -------------------------- |
| `Avatar`      | 프로필 이미지    | `size`, `src`, `fallback`  |
| `AvatarGroup` | 아바타 그룹      | `max`, `size`              |
| `Badge`       | 상태 배지        | `variant`                  |
| `Tag`         | 태그 (삭제 가능) | `variant`, `onRemove`      |
| `Chip`        | 선택 칩          | `selected`, `disabled`     |
| `Tooltip`     | 툴팁             | `content`, `side`, `align` |

### Form

| 컴포넌트     | 설명        | Props                                 |
| ------------ | ----------- | ------------------------------------- |
| `Select`     | 드롭다운    | Radix 기반                            |
| `Checkbox`   | 체크박스    | `label`, `description`                |
| `RadioGroup` | 라디오 그룹 | Radix 기반                            |
| `Toggle`     | 토글 버튼   | `size`                                |
| `Switch`     | 스위치      | `checked`, `onCheckedChange`, `label` |

### Feedback

| 컴포넌트           | 설명            | Props                        |
| ------------------ | --------------- | ---------------------------- |
| `Spinner`          | 로딩 스피너     | `size`                       |
| `Skeleton`         | 스켈레톤        | `variant`, `width`, `height` |
| `LoadingOverlay`   | 로딩 오버레이   | `visible`, `label`           |
| `ProgressBar`      | 프로그레스 바   | `value`, `max`, `variant`    |
| `CircularProgress` | 원형 프로그레스 | `value`, `size`              |
| `toast`            | 토스트 알림     | 함수 호출                    |

### Overlay

| 컴포넌트      | 설명            | Props                           |
| ------------- | --------------- | ------------------------------- |
| `Modal`       | 모달            | Radix 기반                      |
| `AlertDialog` | 확인 다이얼로그 | `title`, `onConfirm`, `variant` |
| `Popover`     | 팝오버          | Radix 기반                      |
| `Dropdown`    | 드롭다운 메뉴   | Radix 기반                      |

### Navigation

| 컴포넌트     | 설명         | Props                                       |
| ------------ | ------------ | ------------------------------------------- |
| `Pagination` | 페이지네이션 | `currentPage`, `totalPages`, `onPageChange` |

### Data

| 컴포넌트          | 설명          | Props                         |
| ----------------- | ------------- | ----------------------------- |
| `DataTable`       | 데이터 테이블 | `columns`, `data`, `pageSize` |
| `Calendar`        | 캘린더        | react-day-picker 기반         |
| `DatePicker`      | 날짜 선택     | `value`, `onChange`           |
| `DateRangePicker` | 기간 선택     | `value`, `onChange`           |

---

## 예제

### Button

```tsx
<Button variant="primary">확인</Button>
<Button variant="secondary" size="lg">보조</Button>
<Button variant="ghost">고스트</Button>
<Button variant="danger" isLoading>삭제 중...</Button>
```

### Input

```tsx
<Input label="이메일" placeholder="example@email.com" />
<Input label="비밀번호" type="password" error="8자 이상 입력하세요" />
<Input hint="선택 사항입니다" />
```

### Card

```tsx
<Card variant="default">기본 카드</Card>
<Card variant="bordered">테두리 카드</Card>
<Card variant="glass">글래스 카드</Card>

// 구조화된 카드
<Card>
  <CardHeader>
    <CardTitle>제목</CardTitle>
    <CardDescription>설명</CardDescription>
  </CardHeader>
  <CardContent>내용</CardContent>
  <CardFooter>
    <Button>확인</Button>
  </CardFooter>
</Card>
```

### Select

```tsx
<Select>
  <SelectTrigger>
    <SelectValue placeholder="선택하세요" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="1">옵션 1</SelectItem>
    <SelectItem value="2">옵션 2</SelectItem>
  </SelectContent>
</Select>
```

### Modal

```tsx
<Modal>
  <ModalTrigger asChild>
    <Button>열기</Button>
  </ModalTrigger>
  <ModalContent>
    <ModalHeader>
      <ModalTitle>제목</ModalTitle>
      <ModalDescription>설명</ModalDescription>
    </ModalHeader>
    <p>내용</p>
    <ModalFooter>
      <ModalClose asChild>
        <Button variant="ghost">취소</Button>
      </ModalClose>
      <Button>확인</Button>
    </ModalFooter>
  </ModalContent>
</Modal>
```

### AlertDialog

```tsx
const [open, setOpen] = useState(false);

<AlertDialog
  open={open}
  onOpenChange={setOpen}
  title="삭제하시겠습니까?"
  description="이 작업은 되돌릴 수 없습니다."
  variant="danger"
  confirmLabel="삭제"
  onConfirm={() => handleDelete()}
/>;
```

### Toast

```tsx
import { toast } from '@/components/ui';

toast.success('저장되었습니다');
toast.error('오류가 발생했습니다');
toast.warning('주의가 필요합니다');
toast.info('참고 정보입니다');

// Promise
toast.promise(saveData(), {
  loading: '저장 중...',
  success: '저장 완료',
  error: '저장 실패',
});
```

### DataTable

```tsx
import { DataTable, type ColumnDef } from '@/components/ui';

const columns: ColumnDef<User>[] = [
  { accessorKey: 'name', header: '이름' },
  { accessorKey: 'email', header: '이메일' },
  {
    accessorKey: 'role',
    header: '역할',
    cell: ({ row }) => <Badge>{row.original.role}</Badge>,
  },
];

<DataTable columns={columns} data={users} pageSize={10} />;
```

### Calendar / DatePicker

```tsx
// 캘린더
<Calendar
  mode="single"
  selected={date}
  onSelect={setDate}
/>

// 날짜 선택기
<DatePicker
  value={date}
  onChange={setDate}
  placeholder="날짜를 선택하세요"
/>

// 기간 선택기
<DateRangePicker
  value={dateRange}
  onChange={setDateRange}
/>
```

### Sidebar

```tsx
<Sidebar collapsed={isCollapsed}>
  <SidebarHeader>
    <Logo />
  </SidebarHeader>
  <SidebarContent>
    <SidebarGroup label="메뉴">
      <SidebarItem icon={<HomeIcon />} active>
        홈
      </SidebarItem>
      <SidebarItem icon={<CalendarIcon />}>일정</SidebarItem>
      <SidebarItem icon={<MusicIcon />}>합주</SidebarItem>
    </SidebarGroup>
  </SidebarContent>
  <SidebarFooter>
    <UserProfile />
  </SidebarFooter>
</Sidebar>
```

---

## 아이콘

```tsx
import {
  HomeIcon,
  MenuIcon,
  SearchIcon,
  SettingsIcon,
  PlusIcon,
  EditIcon,
  TrashIcon,
  CloseIcon,
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  UserIcon,
  UsersIcon,
  MusicIcon,
  CalendarIcon,
  ClockIcon,
  BellIcon,
  AlertCircleIcon,
  CheckCircleIcon,
  InfoIcon,
  MoreHorizontalIcon,
  MoreVerticalIcon,
  ExternalLinkIcon,
  LogOutIcon,
  SunIcon,
  MoonIcon,
} from '@/components/ui';

<HomeIcon size={24} className="text-primary" />;
```

---

## 컴포넌트 작성 규칙

### 파일 구조

```tsx
// button.tsx
import { forwardRef, type ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', className = '', ...props }, ref) => {
    return <button ref={ref} className={`... ${className}`} {...props} />;
  },
);

Button.displayName = 'Button';
```

### 규칙

1. **forwardRef 사용** - DOM 접근 지원
2. **기본값 설정** - 필수가 아닌 props는 기본값 제공
3. **className 병합** - 외부에서 추가 스타일 적용 가능
4. **displayName 설정** - 디버깅 용이
5. **Tailwind 클래스 사용** - 디자인 토큰 활용

### 새 컴포넌트 추가 시

1. `apps/web/src/components/ui/[name].tsx` 파일 생성
2. `apps/web/src/components/ui/index.ts`에 export 추가
3. 이 문서에 사용법 추가

---

## 설정 필수 사항

### Toaster 설정

`app/layout.tsx`에 Toaster 추가:

```tsx
import { Toaster } from '@/components/ui';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
```

### TooltipProvider 설정 (Tooltip 사용 시)

```tsx
import { TooltipProvider } from '@/components/ui';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <TooltipProvider>{children}</TooltipProvider>
      </body>
    </html>
  );
}
```

---

## 관련 문서

- [UI 가이드라인](./05-ui-guidelines.md) - 디자인 시스템, 색상, 글래스모피즘
- [아키텍처](./03-architecture.md) - 프로젝트 구조
