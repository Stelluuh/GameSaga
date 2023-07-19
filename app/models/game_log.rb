class GameLog < ApplicationRecord
  belongs_to :game
  belongs_to :user

  validates :rating, numericality: { only_integer: true, greater_than_or_equal_to: 0, less_than_or_equal_to: 5 }, allow_nil: true
  validates :date_started, presence: true, if: :in_progress_or_completed_or_abandoned?
  validates :date_stopped, presence: true, if: :abandoned? 
  validates :date_completed, presence: true, if: :completed?
  validates :play_time, numericality: { only_integer: true, greater_than_or_equal_to: 0 }, allow_nil: true
  validate :date_started_before_date_stopped
  validate :date_started_before_date_completed
  validate :date_started_valid
  validate :date_stopped_valid
  validate :date_completed_valid
  validate :date_constraints

  
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
  
  def date_started_before_date_stopped
    if date_started.present? && date_stopped.present? && date_started > date_stopped
      errors.add(:date_started, "must be before date stopped")
    end
  end

  def date_started_before_date_completed
    if date_started.present? && date_completed.present? && date_started > date_completed
      errors.add(:date_started, "must be before date completed")
    end
  end

  #q: how to make sure that all dates selected is not in the future?
  def date_started_valid
    if date_started.present? && date_started > Date.today
      errors.add(:date_started, "must be before today")
    end
  end

  def date_stopped_valid
    if date_stopped.present? && date_stopped > Date.today
      errors.add(:date_stopped, "must be before today")
    end
  end

  def date_completed_valid
    if date_completed.present? && date_completed > Date.today
      errors.add(:date_completed, "must be before today")
    end
  end

  def date_constraints
    if status == 'Abandoned' && date_completed.present?
      errors.add(:date_completed, 'cannot be set for Abandoned status')
    end

    if status == 'In Progress' && (date_stopped.present? || date_completed.present?)
      errors.add(:date_stopped, 'cannot be set for In Progress status')
      errors.add(:date_completed, 'cannot be set for In Progress status')
    end

    if status == 'Complete' && date_stopped.present?
      errors.add(:date_stopped, 'cannot be set for Complete status')
    end
  end


end