import { pgTable, text, uuid, timestamp, integer, boolean, numeric, jsonb, check, pgEnum } from 'drizzle-orm/pg-core'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'

// ============================================
// UTILITIES
// ============================================
export const createdAt = timestamp('created_at').notNull().defaultNow()
export const updatedAt = timestamp('updated_at').notNull().defaultNow()

export const timestamps = {
  created_at: createdAt,
  updated_at: updatedAt,
}

// ============================================
// USERS
// ============================================
export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  email: text('email').unique(),
  phone: text('phone').unique(),
  name: text('name').notNull(),
  city_id: uuid('city_id').references(() => cities.id, { onDelete: 'set null' }),
  avatar_url: text('avatar_url'),
  is_premium: boolean('is_premium').notNull().default(false),
  ...timestamps,
})

export type User = typeof users.$inferSelect
export type NewUser = typeof users.$inferInsert

// ============================================
// CITIES
// ============================================
export const cities = pgTable('cities', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull(),
  slug: text('slug').notNull().unique(),
  lat: numeric('lat'),
  lng: numeric('lng'),
  ...timestamps,
})

export type City = typeof cities.$inferSelect
export type NewCity = typeof cities.$inferInsert

// ============================================
// MOTORCYCLES
// ============================================
export const motorcycles = pgTable('motorcycles', {
  id: uuid('id').primaryKey().defaultRandom(),
  user_id: uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  make: text('make').notNull(),
  model: text('model').notNull(),
  year: integer('year'),
  odometer_latest: integer('odometer_latest').notNull().default(0),
  purchase_date: text('purchase_date'),
  is_active: boolean('is_active').notNull().default(true),
  ...timestamps,
})

export type Motorcycle = typeof motorcycles.$inferSelect
export type NewMotorcycle = typeof motorcycles.$inferInsert

// ============================================
// FUEL LOGS
// ============================================
export const fuel_logs = pgTable('fuel_logs', {
  id: uuid('id').primaryKey().defaultRandom(),
  motorcycle_id: uuid('motorcycle_id').notNull().references(() => motorcycles.id, { onDelete: 'cascade' }),
  amount_paid_cents: integer('amount_paid_cents').notNull(),
  litres: numeric('litres', { precision: 6, scale: 2 }).notNull(),
  rate_per_litre: numeric('rate_per_litre', { precision: 6, scale: 2 }).notNull(),
  odometer: integer('odometer').notNull(),
  full_tank: boolean('full_tank').notNull().default(true),
  logged_at: timestamp('logged_at').notNull().defaultNow(),
  client_id: text('client_id'),
  ...timestamps,
})

export type FuelLog = typeof fuel_logs.$inferSelect
export type NewFuelLog = typeof fuel_logs.$inferInsert

// ============================================
// EXPENSES
// ============================================
export const expense_category = pgEnum('expense_category', ['fuel', 'repairs', 'accessories', 'gear', 'food', 'stay', 'transport', 'other'])

export const expenses = pgTable('expenses', {
  id: uuid('id').primaryKey().defaultRandom(),
  motorcycle_id: uuid('motorcycle_id').notNull().references(() => motorcycles.id, { onDelete: 'cascade' }),
  category: expense_category('category').notNull(),
  amount_cents: integer('amount_cents').notNull(),
  parts_amount_cents: integer('parts_amount_cents'),
  labour_amount_cents: integer('labour_amount_cents'),
  workshop_id: uuid('workshop_id').references(() => workshops.id, { onDelete: 'set null' }),
  ride_id: uuid('ride_id').references(() => rides.id, { onDelete: 'set null' }),
  expense_date: text('expense_date').notNull(),
  notes: text('notes'),
  client_id: text('client_id'),
  ...timestamps,
})

export type Expense = typeof expenses.$inferSelect
export type NewExpense = typeof expenses.$inferInsert

// ============================================
// WORKSHOPS
// ============================================
export const workshops = pgTable('workshops', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull(),
  city_id: uuid('city_id').references(() => cities.id, { onDelete: 'set null' }),
  ...timestamps,
})

export type Workshop = typeof workshops.$inferSelect
export type NewWorkshop = typeof workshops.$inferInsert

// ============================================
// PART TYPES
// ============================================
export const part_types = pgTable('part_types', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull(),
  group_name: text('group_name').notNull(),
  default_interval_km: integer('default_interval_km').notNull(),
  ...timestamps,
})

export type PartType = typeof part_types.$inferSelect
export type NewPartType = typeof part_types.$inferInsert

// ============================================
// PART REPLACEMENTS
// ============================================
export const part_replacements = pgTable('part_replacements', {
  id: uuid('id').primaryKey().defaultRandom(),
  motorcycle_id: uuid('motorcycle_id').notNull().references(() => motorcycles.id, { onDelete: 'cascade' }),
  part_type_id: uuid('part_type_id').notNull().references(() => part_types.id, { onDelete: 'restrict' }),
  odometer_at: integer('odometer_at').notNull(),
  custom_interval_km: integer('custom_interval_km'),
  notes: text('notes'),
  ...timestamps,
})

export type PartReplacement = typeof part_replacements.$inferSelect
export type NewPartReplacement = typeof part_replacements.$inferInsert

// ============================================
// DOCUMENTS
// ============================================
export const document_kind = pgEnum('document_kind', ['rc', 'insurance', 'puc', 'service_record', 'other'])

export const documents = pgTable('documents', {
  id: uuid('id').primaryKey().defaultRandom(),
  motorcycle_id: uuid('motorcycle_id').notNull().references(() => motorcycles.id, { onDelete: 'cascade' }),
  kind: document_kind('kind').notNull(),
  insurer: text('insurer'),
  policy_number: text('policy_number'),
  expires_on: text('expires_on'),
  file_path: text('file_path').notNull(),
  file_name: text('file_name').notNull(),
  file_size: integer('file_size').notNull(),
  mime_type: text('mime_type').notNull(),
  ...timestamps,
})

export type Document = typeof documents.$inferSelect
export type NewDocument = typeof documents.$inferInsert

// ============================================
// REMINDERS
// ============================================
export const reminder_kind = pgEnum('reminder_kind', ['service_by_km', 'service_by_date', 'insurance_expiry', 'puc_expiry', 'rc_expiry'])

export const reminders = pgTable('reminders', {
  id: uuid('id').primaryKey().defaultRandom(),
  motorcycle_id: uuid('motorcycle_id').notNull().references(() => motorcycles.id, { onDelete: 'cascade' }),
  kind: reminder_kind('kind').notNull(),
  due_km: integer('due_km'),
  due_date: text('due_date'),
  sent_at: timestamp('sent_at'),
  ...timestamps,
})

export type Reminder = typeof reminders.$inferSelect
export type NewReminder = typeof reminders.$inferInsert

// ============================================
// RIDES
// ============================================
export const ride_type = pgEnum('ride_type', ['breakfast', 'day', 'multi_day'])

export const rides = pgTable('rides', {
  id: uuid('id').primaryKey().defaultRandom(),
  owner_id: uuid('owner_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  bike_id: uuid('bike_id').references(() => motorcycles.id, { onDelete: 'set null' }),
  title: text('title').notNull(),
  description: text('description'),
  start_place: text('start_place').notNull(),
  end_place: text('end_place').notNull(),
  start_lat: numeric('start_lat'),
  start_lng: numeric('start_lng'),
  end_lat: numeric('end_lat'),
  end_lng: numeric('end_lng'),
  start_at: timestamp('start_at').notNull(),
  end_at: timestamp('end_at'),
  is_public: boolean('is_public').notNull().default(true),
  riders_wanted: integer('riders_wanted'),
  cost_note: text('cost_note'),
  food_stay_included: boolean('food_stay_included').notNull().default(false),
  type: ride_type('type').notNull().default('day'),
  city_id: uuid('city_id').references(() => cities.id, { onDelete: 'set null' }),
  status: text('status').notNull().default('upcoming').check('status IN (\'upcoming\',\'active\',\'completed\',\'cancelled\')'),
  ...timestamps,
})

export type Ride = typeof rides.$inferSelect
export type NewRide = typeof rides.$inferInsert

// ============================================
// RIDE PARTICIPANTS
// ============================================
export const participant_role = pgEnum('participant_role', ['organiser', 'rider', 'spectator'])
export const participant_status = pgEnum('participant_status', ['requested', 'accepted', 'declined', 'joined'])

export const ride_participants = pgTable('ride_participants', {
  id: uuid('id').primaryKey().defaultRandom(),
  ride_id: uuid('ride_id').notNull().references(() => rides.id, { onDelete: 'cascade' }),
  user_id: uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  role: participant_role('role').notNull().default('rider'),
  status: participant_status('status').notNull().default('requested'),
  distance_km: numeric('distance_km', { precision: 8, scale: 2 }),
  avg_speed_kmph: numeric('avg_speed_kmph', { precision: 6, scale: 2 }),
  stopped_minutes: integer('stopped_minutes'),
  joined_at: timestamp('joined_at'),
  ...timestamps,
})

export type RideParticipant = typeof ride_participants.$inferSelect
export type NewRideParticipant = typeof ride_participants.$inferInsert

// ============================================
// TRACK POINTS
// ============================================
export const track_points = pgTable('track_points', {
  id: uuid('id').primaryKey().defaultRandom(),
  ride_id: uuid('ride_id').notNull().references(() => rides.id, { onDelete: 'cascade' }),
  user_id: uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  lat: numeric('lat').notNull(),
  lng: numeric('lng').notNull(),
  altitude: numeric('altitude'),
  speed_kmph: numeric('speed_kmph', { precision: 6, scale: 2 }),
  recorded_at: timestamp('recorded_at').notNull().defaultNow(),
})

export type TrackPoint = typeof track_points.$inferSelect
export type NewTrackPoint = typeof track_points.$inferInsert

// ============================================
// GROUPS
// ============================================
export const groups = pgTable('groups', {
  id: uuid('id').primaryKey().defaultRandom(),
  ride_id: uuid('ride_id').notNull().references(() => rides.id, { onDelete: 'cascade' }),
  invite_code: text('invite_code').notNull().unique(),
  invite_expires_at: timestamp('invite_expires_at').notNull().defaultNow().$defaultFn(() => new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)),
  max_members: integer('max_members').notNull().default(20),
  is_active: boolean('is_active').notNull().default(true),
  ...timestamps,
})

export type Group = typeof groups.$inferSelect
export type NewGroup = typeof groups.$inferInsert

// ============================================
// GROUP MEMBERS
// ============================================
export const group_member_role = pgEnum('group_member_role', ['leader', 'sweep', 'rider', 'watcher'])
export const group_member_status = pgEnum('group_member_status', ['pending', 'joined', 'left'])

export const group_members = pgTable('group_members', {
  id: uuid('id').primaryKey().defaultRandom(),
  group_id: uuid('group_id').notNull().references(() => groups.id, { onDelete: 'cascade' }),
  user_id: uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  role: group_member_role('role').notNull().default('rider'),
  status: group_member_status('status').notNull().default('pending'),
  joined_at: timestamp('joined_at'),
  ...timestamps,
})

export type GroupMember = typeof group_members.$inferSelect
export type NewGroupMember = typeof group_members.$inferInsert

// ============================================
// CLUBS
// ============================================
export const clubs = pgTable('clubs', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull(),
  city_id: uuid('city_id').notNull().references(() => cities.id, { onDelete: 'restrict' }),
  logo_url: text('logo_url'),
  since_year: integer('since_year'),
  is_public: boolean('is_public').notNull().default(true),
  is_confirmed: boolean('is_confirmed').notNull().default(false),
  ...timestamps,
})

export type Club = typeof clubs.$inferSelect
export type NewClub = typeof clubs.$inferInsert

// ============================================
// CLUB MEMBERS
// ============================================
export const club_member_status = pgEnum('club_member_status', ['member', 'pending', 'declined'])

export const club_members = pgTable('club_members', {
  id: uuid('id').primaryKey().defaultRandom(),
  club_id: uuid('club_id').notNull().references(() => clubs.id, { onDelete: 'cascade' }),
  user_id: uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  status: club_member_status('status').notNull().default('pending'),
  ...timestamps,
})

export type ClubMember = typeof club_members.$inferSelect
export type NewClubMember = typeof club_members.$inferInsert

// ============================================
// NOTIFICATIONS
// ============================================
export const notifications = pgTable('notifications', {
  id: uuid('id').primaryKey().defaultRandom(),
  user_id: uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  type: text('type').notNull(),
  payload: jsonb('payload').notNull().default({}),
  read_at: timestamp('read_at'),
  ...timestamps,
})

export type Notification = typeof notifications.$inferSelect
export type NewNotification = typeof notifications.$inferInsert