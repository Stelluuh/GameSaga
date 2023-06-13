class GameLog < ApplicationRecord
  belongs_to :game
  belongs_to :user

  STATUS_OPTIONS = {
    0 => "Not Started",
    1 => "In Progress",
    2 => "Did Not Finish",
    3 => "Complete",
    4 => "Wishlist"
  }

  validates :date_started, allow_blank: true
  validates :date_stopped, allow_blank: true
  validates :date_completed, allow_blank: true
  validates :play_time, numericality: { only_integer: true, greater_than_or_equal_to: 0 }
  validates :rating, numericality: { only_integer: true, greater_than_or_equal_to: 0 }
  validates :status, presence: true, inclusion: { in: STATUS_OPTIONS.keys }

  def display_status
    STATUS_OPTIONS[status]
  end
end

