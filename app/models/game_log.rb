class GameLog < ApplicationRecord
  belongs_to :game
  belongs_to :user

  # validates :status, inclusion: { in: ['Not Played', 'In Progress', 'Abandoned', 'Complete', 'Wishlist'] }
  validates :rating, numericality: { only_integer: true, greater_than_or_equal_to: 0, less_than_or_equal_to: 5 }, allow_nil: true
  # validates :date_started, presence: true
  # validates :date_stopped, presence: true, if: :completed?
  # validates :date_completed, presence: true, if: :completed?
  validates :play_time, numericality: { only_integer: true, greater_than_or_equal_to: 0 }, allow_nil: true

  private

  def completed?
    status == 'Complete'
  end
end
