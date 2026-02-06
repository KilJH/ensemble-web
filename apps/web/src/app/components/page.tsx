'use client';

import { useState } from 'react';
import {
  Button,
  IconButton,
  Input,
  Textarea,
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  Badge,
  Tag,
  Chip,
  Checkbox,
  RadioGroup,
  RadioGroupItem,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  SegmentedControl,
  Modal,
  ModalTrigger,
  ModalContent,
  ModalHeader,
  ModalTitle,
  ModalDescription,
  ModalFooter,
  AlertDialog,
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerBody,
  Alert,
  PlusIcon,
  EditIcon,
  TrashIcon,
  SearchIcon,
} from '@/components/ui';

export default function ComponentsPage() {
  const [alertOpen, setAlertOpen] = useState(false);
  const [segment, setSegment] = useState<'list' | 'grid'>('list');

  return (
    <div className="min-h-screen bg-bg p-8">
      <div className="max-w-5xl mx-auto space-y-12">
        <header>
          <h1 className="text-3xl font-bold text-text">Component Library</h1>
          <p className="text-text-muted mt-2">Variant / Size / State 매트릭스 데모</p>
        </header>

        {/* Button */}
        <Section title="Button">
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
              <Button variant="primary">Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="danger">Danger</Button>
              <Button variant="link">Link</Button>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button size="sm">Small</Button>
              <Button size="md">Medium</Button>
              <Button size="lg">Large</Button>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button isLoading>Loading</Button>
              <Button disabled>Disabled</Button>
              <Button leftIcon={<PlusIcon size={16} />}>With Icon</Button>
            </div>
            <div className="flex flex-wrap gap-2">
              <IconButton icon={<EditIcon size={20} />} aria-label="Edit" />
              <IconButton icon={<TrashIcon size={20} />} variant="danger" aria-label="Delete" />
            </div>
          </div>
        </Section>

        {/* Input */}
        <Section title="Input / Textarea">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input label="Default" placeholder="기본 입력" />
            <Input variant="filled" label="Filled" placeholder="채움 스타일" />
            <Input variant="ghost" label="Ghost" placeholder="투명 스타일" />
            <Input label="With Error" error="필수 항목입니다" placeholder="에러 상태" />
            <Input label="With Icon" leftIcon={<SearchIcon size={16} />} placeholder="검색..." />
            <Input label="Disabled" disabled placeholder="비활성" />
          </div>
          <div className="mt-4">
            <Textarea label="Textarea" placeholder="여러 줄 입력" hint="선택 사항" />
          </div>
        </Section>

        {/* Select */}
        <Section title="Select">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Default" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">옵션 1</SelectItem>
                <SelectItem value="2">옵션 2</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger variant="filled">
                <SelectValue placeholder="Filled" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">옵션 1</SelectItem>
                <SelectItem value="2">옵션 2</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger error>
                <SelectValue placeholder="Error" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">옵션 1</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </Section>

        {/* Card */}
        <Section title="Card">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card variant="default">
              <CardHeader>
                <CardTitle>Default</CardTitle>
              </CardHeader>
              <CardContent>그림자 있는 기본</CardContent>
            </Card>
            <Card variant="bordered">
              <CardHeader>
                <CardTitle>Bordered</CardTitle>
              </CardHeader>
              <CardContent>테두리만</CardContent>
            </Card>
            <Card variant="glass">
              <CardHeader>
                <CardTitle>Glass</CardTitle>
              </CardHeader>
              <CardContent>글래스모피즘</CardContent>
            </Card>
            <Card variant="interactive" tabIndex={0}>
              <CardHeader>
                <CardTitle>Interactive</CardTitle>
              </CardHeader>
              <CardContent>호버 효과</CardContent>
            </Card>
          </div>
        </Section>

        {/* Badge / Tag / Chip */}
        <Section title="Badge / Tag / Chip">
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
              <Badge variant="default">Default</Badge>
              <Badge variant="primary">Primary</Badge>
              <Badge variant="secondary">Secondary</Badge>
              <Badge variant="success">Success</Badge>
              <Badge variant="warning">Warning</Badge>
              <Badge variant="danger">Danger</Badge>
              <Badge variant="info">Info</Badge>
              <Badge variant="outline">Outline</Badge>
            </div>
            <div className="flex flex-wrap gap-2">
              <Badge size="sm">Small</Badge>
              <Badge size="md">Medium</Badge>
              <Badge size="lg">Large</Badge>
            </div>
            <div className="flex flex-wrap gap-2">
              <Tag variant="primary" onRemove={() => {}}>
                Removable Tag
              </Tag>
              <Tag variant="secondary">Tag</Tag>
            </div>
            <div className="flex flex-wrap gap-2">
              <Chip>Chip</Chip>
              <Chip selected>Selected</Chip>
              <Chip disabled>Disabled</Chip>
            </div>
          </div>
        </Section>

        {/* Checkbox / Radio */}
        <Section title="Checkbox / Radio">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-3">
              <Checkbox label="기본 체크박스" />
              <Checkbox size="sm" label="작은 체크박스" />
              <Checkbox label="에러 상태" error="필수 항목" />
              <Checkbox label="비활성" disabled />
            </div>
            <RadioGroup defaultValue="1">
              <RadioGroupItem value="1" label="옵션 1" />
              <RadioGroupItem value="2" label="옵션 2" />
              <RadioGroupItem value="3" label="비활성" disabled />
            </RadioGroup>
          </div>
        </Section>

        {/* Tabs */}
        <Section title="Tabs">
          <div className="space-y-6">
            <Tabs defaultValue="tab1">
              <TabsList variant="underline">
                <TabsTrigger value="tab1" variant="underline">
                  Underline 1
                </TabsTrigger>
                <TabsTrigger value="tab2" variant="underline">
                  Underline 2
                </TabsTrigger>
              </TabsList>
              <TabsContent value="tab1">Underline 탭 내용 1</TabsContent>
              <TabsContent value="tab2">Underline 탭 내용 2</TabsContent>
            </Tabs>

            <Tabs defaultValue="a">
              <TabsList variant="pills">
                <TabsTrigger value="a" variant="pills">
                  Pills A
                </TabsTrigger>
                <TabsTrigger value="b" variant="pills">
                  Pills B
                </TabsTrigger>
              </TabsList>
              <TabsContent value="a">Pills 탭 내용 A</TabsContent>
              <TabsContent value="b">Pills 탭 내용 B</TabsContent>
            </Tabs>
          </div>
        </Section>

        {/* SegmentedControl */}
        <Section title="SegmentedControl">
          <div className="space-y-4">
            <SegmentedControl
              options={[
                { value: 'list', label: '목록' },
                { value: 'grid', label: '그리드' },
              ]}
              value={segment}
              onChange={setSegment}
            />
            <p className="text-text-muted">선택: {segment}</p>
          </div>
        </Section>

        {/* Alert */}
        <Section title="Alert">
          <div className="space-y-3">
            <Alert variant="info" title="정보">
              새로운 기능이 추가되었습니다.
            </Alert>
            <Alert variant="success" title="성공">
              저장되었습니다.
            </Alert>
            <Alert variant="warning" title="경고">
              주의가 필요합니다.
            </Alert>
            <Alert variant="danger" title="오류" dismissible onDismiss={() => {}}>
              오류가 발생했습니다.
            </Alert>
          </div>
        </Section>

        {/* Modal / Drawer */}
        <Section title="Modal / Drawer">
          <div className="flex flex-wrap gap-2">
            <Modal>
              <ModalTrigger asChild>
                <Button>Modal 열기</Button>
              </ModalTrigger>
              <ModalContent>
                <ModalHeader>
                  <ModalTitle>모달 제목</ModalTitle>
                  <ModalDescription>모달 설명입니다.</ModalDescription>
                </ModalHeader>
                <p className="text-text">모달 내용</p>
                <ModalFooter>
                  <Button variant="ghost">취소</Button>
                  <Button>확인</Button>
                </ModalFooter>
              </ModalContent>
            </Modal>

            <Button variant="danger" onClick={() => setAlertOpen(true)}>
              AlertDialog 열기
            </Button>
            <AlertDialog
              open={alertOpen}
              onOpenChange={setAlertOpen}
              title="삭제하시겠습니까?"
              description="이 작업은 되돌릴 수 없습니다."
              variant="danger"
              confirmLabel="삭제"
              onConfirm={() => {}}
            />

            <Drawer>
              <DrawerTrigger asChild>
                <Button variant="outline">Drawer 열기</Button>
              </DrawerTrigger>
              <DrawerContent side="right">
                <DrawerHeader>
                  <DrawerTitle>Drawer 제목</DrawerTitle>
                </DrawerHeader>
                <DrawerBody>
                  <p className="text-text">Drawer 내용</p>
                </DrawerBody>
              </DrawerContent>
            </Drawer>
          </div>
        </Section>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="text-xl font-semibold text-text mb-4 pb-2 border-b border-border">{title}</h2>
      {children}
    </section>
  );
}
