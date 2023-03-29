import * as RdxTabs from '@radix-ui/react-tabs';
import { clsx } from 'clsx';
import { Flex, type FlexVariants } from '../flex/flex';

import styles from './tabs.module.css';

interface TabsProps extends Omit<RdxTabs.TabsProps, 'orientation'>, FlexVariants {}

const orientationMap = {
  'column': 'horizontal',
  'column-reverse': 'horizontal',
  'row': 'vertical',
  'row-reverse': 'vertical',
} satisfies Record<NonNullable<FlexVariants['flow']>, NonNullable<RdxTabs.TabsProps['orientation']>>;

const Tabs = ({
  children,
  defaultValue,
  value,
  onValueChange,
  dir,
  activationMode,
  flow = 'column',
  gap = 'sm',
  ...props
}: TabsProps) => {
  return (
    <RdxTabs.Root
      defaultValue={defaultValue}
      value={value}
      onValueChange={onValueChange}
      orientation={orientationMap[flow]}
      dir={dir}
      activationMode={activationMode}
      asChild
    >
      <Flex {...props} flow={flow} gap={gap}>
        {children}
      </Flex>
    </RdxTabs.Root>
  );
};

interface TabsListProps extends RdxTabs.TabsListProps {}

const TabsList = (props: TabsListProps) => {
  return <RdxTabs.List {...props} className={clsx(styles.list, props.className)} />;
};

interface TabsTriggerProps extends RdxTabs.TabsTriggerProps {}

const Trigger = ({ children, className, ...props }: TabsTriggerProps) => {
  return (
    <RdxTabs.Trigger {...props} className={clsx(styles.trigger, className)}>
      <div className={styles['trigger-inner']}>{children}</div>
    </RdxTabs.Trigger>
  );
};

interface TabsContentProps extends RdxTabs.TabsContentProps {}

const Content = (props: TabsContentProps) => {
  return <RdxTabs.Content {...props} className={clsx(styles.content, props.className)} />;
};

Tabs.List = TabsList;
Tabs.Trigger = Trigger;
Tabs.Content = Content;

export { Tabs };
