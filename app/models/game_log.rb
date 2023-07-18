class GameLog < ApplicationRecord
  belongs_to :game
  belongs_to :user

  validates :rating, numericality: { only_integer: true, greater_than_or_equal_to: 0, less_than_or_equal_to: 5 }, allow_nil: true
  validates :date_started, presence: true, if: :in_progress_or_completed_or_abandoned? 
  validates :date_stopped, presence: true, if: :abandoned?
  validates :date_completed, presence: true, if: :completed?
  validates :play_time, numericality: { only_integer: true, greater_than_or_equal_to: 0 }, allow_nil: true

  private

  def in_progress_or_completed_or_abandoned?
    status.in?(['In Progress', 'Complete', 'Abandoned'])
  end

  def abandoned?
    status == 'Abandoned'
  end

  def completed?
    status == 'Complete'
  end
end
