import React from 'react';
import arrayMutators from 'final-form-arrays';
import { Form, FormSpy, Field } from 'react-final-form';
import { FieldArray } from 'react-final-form-arrays';
import { random, noop } from 'lodash-es';
import { PuppyRaceContext } from '../PuppyRaceContext';
import { ANIMAL_TYPES, ANIMAL_STATUS, GAME_STATUS } from '../constants';
import './Settings.css';

const LOCALSTORAGE_KEY_SETTINGS = 'settings';
const INITIAL_VALUES = {
  animals: [
    {
      name: 'Puppy',
      type: ANIMAL_TYPES.DOG,
      status: ANIMAL_STATUS.STANDING,
      progress: 0
    },
    {
      name: 'Kitty',
      type: ANIMAL_TYPES.CAT,
      status: ANIMAL_STATUS.STANDING,
      progress: 0
    }
  ]
};

export class Settings extends React.Component {
  state = { initialValues: this.restoreSettings() };

  restoreSettings() {
    try {
      const stored = localStorage.getItem(LOCALSTORAGE_KEY_SETTINGS);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (error) {
      console.error(error);
    }
    return INITIAL_VALUES;
  }

  saveSettings(values) {
    try {
      localStorage.setItem(LOCALSTORAGE_KEY_SETTINGS, JSON.stringify(values));
    } catch (error) {
      console.error(error);
    }
  }

  render() {
    return (
      <PuppyRaceContext.Consumer>
        {({ state, actions }) => (
          <div className="settings">
            <Form
              onSubmit={noop}
              mutators={arrayMutators}
              initialValues={this.state.initialValues}
              render={({ handleSubmit, mutators, values }) => {
                const disabled = state.status !== GAME_STATUS.READY;
                return (
                  <React.Fragment>
                    <FormSpy
                      subscription={{ values: true }}
                      onChange={({ values }) => {
                        this.saveSettings(values);
                        actions.setState(values);
                      }}
                    />
                    <form
                      key="form"
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        margin: '20px'
                      }}
                      onSubmit={handleSubmit}
                    >
                      <FieldArray name="animals">
                        {({ fields }) =>
                          fields.map((name, index) => (
                            <div
                              className={`ui input field left action ${
                                disabled ? 'disabled' : ''
                              }`}
                              key={index}
                            >
                              <Field
                                name={`${name}.type`}
                                component="select"
                                disabled={disabled}
                                className="ui compact selection dropdown"
                                style={{ padding: '6px' }}
                              >
                                <option
                                  value={ANIMAL_TYPES.DOG}
                                  children="🐶"
                                />
                                <option
                                  value={ANIMAL_TYPES.CAT}
                                  children="🐱"
                                />
                              </Field>
                              <Field
                                name={`${name}.name`}
                                component="input"
                                placeholder="name"
                                disabled={disabled}
                              />
                              <button
                                onClick={() => fields.remove(index)}
                                className="ui button icon"
                                disabled={disabled}
                                children={<i className="ui icon remove" />}
                              />
                            </div>
                          ))
                        }
                      </FieldArray>
                      <div className="ui field">
                        <button
                          className="ui button icon fluid"
                          onClick={() =>
                            mutators.push('animals', {
                              type: [ANIMAL_TYPES.DOG, ANIMAL_TYPES.CAT][
                                random(1)
                              ],
                              name: values.animals.length + 1
                            })
                          }
                          disabled={disabled}
                          children={<i className="ui icon add" />}
                        />
                      </div>
                    </form>
                  </React.Fragment>
                );
              }}
            />
          </div>
        )}
      </PuppyRaceContext.Consumer>
    );
  }
}
