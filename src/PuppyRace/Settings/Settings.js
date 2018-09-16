import React from 'react';
import arrayMutators from 'final-form-arrays';
import { Form, FormSpy, Field } from 'react-final-form';
import { FieldArray } from 'react-final-form-arrays';
import { PuppyRaceContext } from '../PuppyRaceContext';
import { ANIMAL_TYPES } from '../constants';
import './Settings.css';

export class Settings extends React.Component {
  render() {
    return (
      <PuppyRaceContext.Consumer>
        {({ state, actions }) => (
          <div className="settings">
            <Form
              onSubmit={({ values }) => actions.setState(values)}
              mutators={arrayMutators}
              render={({ handleSubmit, mutators }) => {
                return (
                  <React.Fragment>
                    <FormSpy subscription={{ values: true }} onChange={({ values }) => actions.setState(values)} />
                    <form
                      key="form"
                      style={{
                        display: 'flex',
                        flexDirection: 'column'
                      }}
                      onSubmit={handleSubmit}
                    >
                      <FieldArray name="animals">
                        {({ fields }) =>
                          fields.map((name, index) => (
                            <div>
                              <Field name={`${name}.type`} component="select">
                                <option value={ANIMAL_TYPES.DOG} children="🐶" />
                                <option value={ANIMAL_TYPES.CAT} children="🐱" />
                              </Field>
                              <Field name={`${name}.name`} component="input" placeholder="name" />
                              <button onClick={() => fields.remove(index)} children="X" />
                            </div>
                          ))
                        }
                      </FieldArray>
                      <div>
                        <button onClick={() => mutators.push('animals', {})} children="+" />
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
