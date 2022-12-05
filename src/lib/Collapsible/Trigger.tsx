import * as Rdx from '@radix-ui/react-collapsible';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';

import { Icon } from '../Icon';
import { type ComponentProps, forwardRef } from 'react';
import { Button } from '../button';

interface TriggerProps extends ComponentProps<typeof Button> {}

export const Trigger = forwardRef<HTMLButtonElement, TriggerProps>(
  ({ children, flow = 'row', cross = 'center', main = 'between', className, ...props }, ref) => {
    return (
      <Rdx.Trigger asChild>
        <Button flow={flow} cross={cross} main={main} className={clsx('group/trigger', className)} {...props} ref={ref}>
          {children}
          <Icon
            className="transition-transform duration-150 group-data-state-open/trigger:rotate-180"
            as={ChevronDownIcon}
          />
        </Button>
      </Rdx.Trigger>
    );
  }
);
