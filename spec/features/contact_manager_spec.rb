require 'rails_helper'

feature 'The one-page contact manager app' do

  scenario 'The homepage loads', js: true do
    visit '/'
    expect(page).to have_title("Contact Manager")
  end

  scenario 'all contacts show up on the homepage', js: true do
    Person.create!(
        first_name: "Joe",
        last_name: "Example",
        address: "15 Main St"
    )
    visit '/'
    expect(page).to have_content "Joe Example"
    expect(page).to have_content "15 Main St"
  end

  scenario 'user can fill in form and create user', js: true do
    visit '/'
    fill_in 'first_name', with: 'Andrew'
    fill_in 'last_name', with: 'Smith'
    fill_in 'address', with: '15 Pine St'
    click_on 'Create Person'
    expect(page).to have_content 'Andrew Smith'
    expect(page).to have_content '15 Pine St'
    expect(Person.all).to_not be_empty
    expect(page).to have_field('first_name', with: '')
    expect(page).to have_field('last_name', with: '')
    expect(page).to have_field('address', with: '')
  end

end