import { Fragment, useContext, useEffect } from 'react';
import { MenuIcon } from '@heroicons/react/outline';
import { Disclosure, Transition } from '@headlessui/react';
import { SettingsContext } from 'utils/settings';
import { OPERATORS, pluralize } from 'utils/utils';
import { MAX_OPERAND_LENGTH } from 'utils/config';
import SettingListbox from 'components/SettingListbox';
import SettingToggle from 'components/SettingToggle';
import SettingNumberInput from 'components/SettingNumberInput';

function getOperandLengths() {
  return [...Array(MAX_OPERAND_LENGTH).keys()].map((i) => i + 1);
}

function Sidebar() {
  const { settings, setSetting } = useContext(SettingsContext);
  const { operation, firstOperandLength, secondOperandLength, showKeypad } =
    settings;

  useEffect(() => {
    if (
      ['subtraction', 'division'].includes(operation) &&
      secondOperandLength > firstOperandLength
    ) {
      setSetting('secondOperandLength', firstOperandLength);
    }
  }, [operation, firstOperandLength, secondOperandLength, setSetting]);

  return (
    <Disclosure as='div' className='flex items-center'>
      <Disclosure.Button aria-label='Show menu'>
        <MenuIcon className='h-9 w-9 text-gray-300' />
      </Disclosure.Button>
      <Transition
        as={Fragment}
        enter='transition-transform duration-500 ease-in-out'
        enterFrom='-translate-x-full'
        enterTo='translate-x-0'
        leave='transition-transform duration-500 ease-in-out'
        leaveFrom='translate-x-0'
        leaveTo='-translate-x-full'
      >
        <Disclosure.Panel className='absolute top-12 left-0 bottom-0 z-10 w-full select-none overflow-auto scroll-smooth bg-[#202022] px-4 pt-4 pb-32 text-lg sm:max-w-sm'>
          <div className='flex flex-col gap-4'>
            <div className='flex flex-col gap-1'>
              <div>Operation</div>
              <SettingListbox
                settingKey='operation'
                optionValues={[
                  'addition',
                  'subtraction',
                  'multiplication',
                  'division'
                ]}
              />
            </div>
            <div className='flex flex-col gap-1'>
              <div>Operand lengths</div>
              <div className='grid grid-cols-[1fr_auto_1fr] items-center gap-4'>
                <SettingListbox
                  settingKey='firstOperandLength'
                  optionValues={getOperandLengths()}
                  optionNames={getOperandLengths().map((length) =>
                    pluralize('digit', length)
                  )}
                />
                <div className='justify-self-center'>
                  {OPERATORS[operation]}
                </div>
                <SettingListbox
                  settingKey='secondOperandLength'
                  optionValues={getOperandLengths()}
                  optionNames={getOperandLengths().map((length) =>
                    pluralize('digit', length)
                  )}
                  disabled={
                    ['subtraction', 'division'].includes(operation)
                      ? Array(firstOperandLength)
                          .fill(false)
                          .concat(
                            Array(MAX_OPERAND_LENGTH - firstOperandLength).fill(
                              true
                            )
                          )
                      : Array(MAX_OPERAND_LENGTH).fill(false)
                  }
                />
              </div>
            </div>
            <div className='flex items-center justify-between'>
              <div>Problems per set</div>
              <div className=''>
                <SettingNumberInput
                  settingKey='problemsPerSet'
                  min={1}
                  max={1000}
                />
              </div>
            </div>
            <div className='h-px bg-zinc-400' />
            <div className='flex flex-col gap-1'>
              <div>Answer input direction</div>
              <SettingListbox
                settingKey='inputDirection'
                optionValues={['right to left', 'left to right']}
              />
            </div>
            <div className='flex items-center justify-between'>
              <div>Show problem number</div>
              <SettingToggle settingKey='showProblemNumber' />
            </div>
            <div className='flex items-center justify-between'>
              <div>Show timer</div>
              <SettingToggle settingKey='showTimer' />
            </div>
            <div className='flex items-center justify-between'>
              <div>Show abort button</div>
              <SettingToggle settingKey='showAbortButton' />
            </div>
            <div className='flex items-center justify-between'>
              <div>Show keypad</div>
              <SettingToggle settingKey='showKeypad' />
            </div>
            <Transition
              as={Fragment}
              show={showKeypad}
              enter='transition-opacity duration-100 ease-out'
              enterFrom='opacity-0'
              enterTo='opacity-100'
              leave='transition-opacity duration-100 ease-in'
              leaveFrom='opacity-100'
              leaveTo='opacity-0'
            >
              <div className='flex items-center justify-between'>
                <div>Reverse keypad</div>
                <SettingToggle settingKey='reverseKeypad' />
              </div>
            </Transition>
            <Transition
              as={Fragment}
              show={showKeypad}
              enter='transition-opacity duration-100 ease-out'
              enterFrom='opacity-0'
              enterTo='opacity-100'
              leave='transition-opacity duration-100 ease-in'
              leaveFrom='opacity-100'
              leaveTo='opacity-0'
            >
              <div className='flex flex-col gap-1'>
                <div>Keypad zero position</div>
                <SettingListbox
                  settingKey='keypadZeroPosition'
                  optionValues={['zero first', 'zero last']}
                />
              </div>
            </Transition>
          </div>
        </Disclosure.Panel>
      </Transition>
    </Disclosure>
  );
}

export default Sidebar;
